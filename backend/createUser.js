const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const connectDB = require('./src/config/dbConfig');
require('dotenv').config();

const criarUsuario = async () => {
  try {
    await connectDB();

    const email = 'gui@email.com';
    const senha = '123456';

    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      console.log('Usuário já existe!');
      mongoose.disconnect();
      return;
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = new User({
      email,
      password: senhaCriptografada,
    });

    await novoUsuario.save();
    console.log('Usuário criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar usuário:', error.message);
  } finally {
    mongoose.disconnect();
  }
};

criarUsuario();