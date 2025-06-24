const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = require('./config/dbConfig');
connectDB();

const cors = require('cors');
app.use(cors());

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const historyRoutes = require('./routes/history');
app.use('/api', historyRoutes);

const insertRoutes = require('./routes/insert');
app.use('/api', insertRoutes);

const searchRoutes = require('./routes/search');
app.use('/api', searchRoutes);

app.get('/', (req, res) => {
  res.send('Servidor Express rodando...');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});