const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Insert = require('../models/Insert');
require('dotenv').config();

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
    res.status(401).json({ message: 'Token inválido' });
  }
};

// POST /api/insert
router.post('/insert', autenticar,
  [
    body('nome').notEmpty().withMessage('Campo nome é obrigatório'),
    body('ip').notEmpty().withMessage('Campo IP é obrigatório')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nome, ip } = req.body;

    try {
      const novaInsercao = new Insert({
        userId: req.userId,
        nome,
        ip,
        data: new Date()
      });

      await novaInsercao.save();
      res.status(201).json({ message: 'Dados inseridos com sucesso' });
    } catch (error) {
      console.error('Erro na inserção:', error.message);
      res.status(500).json({ message: 'Erro ao inserir dados' });
    }
  }
);

module.exports = router;