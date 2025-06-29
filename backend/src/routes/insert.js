const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const SearchHistory = require('../models/SearchHistory');
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

// Middleware de autenticação
const autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token não enviado' });

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (error) {
    logger.warn(`Token inválido utilizado: ${token}`);
    res.status(401).json({ message: 'Token inválido' });
  }
};

// POST /api/insert
router.post(
  '/insert',
  autenticar,
  [
    body('nome')
      .trim()
      .escape()
      .notEmpty().withMessage('Campo nome é obrigatório')
      .isLength({ max: 50 }).withMessage('Nome deve ter no máximo 50 caracteres'),

    body('ip')
      .trim()
      .notEmpty().withMessage('Campo IP é obrigatório')
      .isIP().withMessage('Formato de IP inválido')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(`Validação falhou na inserção de IP: ${JSON.stringify(errors.array())}`);
      return res.status(400).json({ errors: errors.array() });
    }

    const { nome, ip } = req.body;

    try {
      const jaExiste = await SearchHistory.findOne({
        userId: req.userId,
        ipConsultado: ip
      });

      if (jaExiste) {
        logger.info(`Usuário ${req.userId} tentou inserir IP duplicado: ${ip}`);
        return res.status(409).json({ message: 'Este IP já foi inserido anteriormente.' });
      }

      const resultado = {
        ip,
        cidade: 'Desconhecida',
        estado: 'Desconhecido',
        pais: nome
      };

      const insercaoManual = new SearchHistory({
        userId: req.userId,
        ipConsultado: ip,
        resultado,
        data: new Date()
      });

      await insercaoManual.save();

      logger.info(`IP ${ip} inserido com sucesso por userId ${req.userId}`);
      res.status(201).json({ message: 'IP e nome inseridos com sucesso' });
    } catch (error) {
      logger.error(`Erro na inserção de IP ${ip}: ${error.message}`);
      res.status(500).json({ message: 'Erro ao inserir dados' });
    }
  }
);

module.exports = router;