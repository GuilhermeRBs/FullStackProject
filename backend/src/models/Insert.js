const mongoose = require('mongoose');

const InsertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nome: { type: String, required: true },
  ip: { type: String, required: true },
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Insert', InsertSchema);
