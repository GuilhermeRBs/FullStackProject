const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/dbConfig');
require('dotenv').config();

const criarUsuario = async () => {
  try {
    await connectDB();
    const senhaCriptografada = await bcrypt.hash('123456', 10);
    const novoUsuario = new User({
      username: 'guilherme',
      password: senhaCriptografada
    });

    await novoUsuario.save();
    console.log('Usuário criado com sucesso!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Erro ao criar usuário:', error.message);
  }
};

criarUsuario();