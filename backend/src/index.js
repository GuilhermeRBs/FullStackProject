const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/dbConfig');
connectDB();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Servidor Express rodando...');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});