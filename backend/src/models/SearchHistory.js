const mongoose = require('mongoose');

const SearchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ipConsultado: { type: String, required: true },
  resultado: { type: Object },
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SearchHistory', SearchHistorySchema);