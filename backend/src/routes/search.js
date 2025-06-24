const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
require('dotenv').config();

// Model de histórico
const SearchHistory = require('../models/SearchHistory');

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

// Realiza busca de IP + inserção no histórico (logs)
router.post(
  '/search',
  autenticar,
  [body('ip').notEmpty().withMessage('O campo IP é obrigatório')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { ip } = req.body;

    try {
      const resultadoSimulado = {
        ip,
        cidade: 'Curitiba',
        estado: 'Paraná',
        pais: 'Brasil'
      };

      const novaBusca = new SearchHistory({
        userId: req.userId,
        ipConsultado: ip,
        resultado: resultadoSimulado,
        data: new Date()
      });
      await novaBusca.save();

      res.json({ resultado: resultadoSimulado });
    } catch (err) {
      res.status(500).json({ message: 'Erro na busca de IP' });
    }
  }
);

module.exports = router;