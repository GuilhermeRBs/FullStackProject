const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SearchHistory = require('../models/SearchHistory');
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

// Rota para buscar histórico
router.get('/history', autenticar, async (req, res) => {
  try {
    const historico = await SearchHistory.find({ userId: req.userId }).sort({ data: -1 });
    res.json({ historico });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar histórico' });
  }
});

module.exports = router;