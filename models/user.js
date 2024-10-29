const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true }, 
  password: String,
  anioNacimiento: Number,
});

module.exports = mongoose.model('User', userSchema);