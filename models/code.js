const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  prize: { type: Number, required: true },
  disponible: { type: Boolean, default: true }
});

module.exports = mongoose.model('Code', codeSchema);