// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: Date, required: true },
  cedula: { type: String, required: true, unique: true },
  correo: { type: String, required: true, unique: true },
  celular: { type: String, required: true },
  ciudad: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', userSchema);
