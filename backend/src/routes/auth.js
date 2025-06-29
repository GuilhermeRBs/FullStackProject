const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
  ),
  transports: [
    new winston.transports.File({ filename: 'atividade.log' }),
    new winston.transports.File({ filename: 'erros.log', level: 'error' })
  ]
});

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: { message: 'Muitas tentativas de login. Tente novamente em alguns minutos.' }
});

// Rota Login
router.post(
  '/login', limiter,
  [
    body('email')
      .trim()
      .normalizeEmail()
      .notEmpty().withMessage('Email é obrigatório')
      .isEmail().withMessage('Formato de email inválido'),

    body('password')
      .trim()
      .escape()
      .notEmpty().withMessage('Senha é obrigatória')
      .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(`Validação falhou no login: ${JSON.stringify(errors.array())}`);
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        logger.warn(`Tentativa de login com email inexistente: ${email}`);
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        logger.warn(`Senha incorreta para o email: ${email}`);
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      logger.info(`Login realizado com sucesso para o email: ${email}`);
      res.json({ token });
    } catch (err) {
      logger.error(`Erro inesperado no login: ${err.message}`);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
);

module.exports = router;