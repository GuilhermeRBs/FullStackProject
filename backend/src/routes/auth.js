const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5, // Máximo de 5 tentativas
  message: { message: 'Muitas tentativas de login. Tente novamente em alguns minutos.' }
});

app.use('/api/login', limiter);

require('dotenv').config();

// Rota Login
router.post(
  '/login', loginLimiter,
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
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      res.json({ token });
    } catch (err) {
      console.error('Erro no login:', err.message);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
);

module.exports = router;