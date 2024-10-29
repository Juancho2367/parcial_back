const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  prize: Number,
});

module.exports = mongoose.model('code', codeSchema);