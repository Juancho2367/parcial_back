const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  prize: { type: Number, required: true },
  claimDate: { type: Date, default: Date.now },
  location: { type: String, required: true } // Ubicación del reclamo
});

module.exports = mongoose.model('Log', logSchema);