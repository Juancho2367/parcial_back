// models/Reclamo.js
const mongoose = require('mongoose');

const reclamoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  codigo: { type: String, required: true },
  montoGanado: { type: Number, default: 0 },
  fechaReclamo: { type: Date, default: Date.now },
  estado: { type: String, default: 'pendiente' } // Estado puede ser 'pendiente', 'reclamado' o mensajes de error
});

module.exports = mongoose.model('Reclamo', reclamoSchema);
