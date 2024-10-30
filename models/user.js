const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true }, // Asegúrate de que 'nombre' esté definido
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  anioNacimiento: { type: Number, required: true }, // Agrega el campo anioNacimiento
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Pre-save hook para encriptar la contraseña
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);