// models/Codigo.js
const mongoose = require('mongoose');

const codigoSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  monto: { type: Number, required: true },
  estado: { type: String, default: 'por reclamar' }, // Estado puede ser 'por reclamar' o 'reclamado'
  fechaReclamo: { type: Date, default: null }
});

module.exports = mongoose.model('Codigo', codigoSchema);
