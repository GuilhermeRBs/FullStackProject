const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

require('dotenv').config();

// Rota Login
router.post('/login',
  [
    body('username').notEmpty().withMessage('Usuário é obrigatório'),
    body('password').notEmpty().withMessage('Senha é obrigatória')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
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
