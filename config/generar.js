const mongoose = require('mongoose');
const Codigo = require('../models/code'); // Ajusta la ruta según tu estructura de carpetas

async function seedCodes() {
  await mongoose.connect('mongodb+srv://juanquintero05:Iatge8E4pLQvfDln@juandacho.3pujv.mongodb.net/?retryWrites=true&w=majority&appName=Juandacho', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const codes = new Set(); // Usamos un Set para evitar duplicados

  // Generar códigos de 1 millón
  for (let i = 0; i < 50; i++) {
    let codigo; // Cambia el nombre de la variable a "codigo"
    do {
      codigo = Math.floor(Math.random() * 900) + 100; // Genera un código aleatorio de 3 dígitos
    } while (codes.has(codigo)); // Verifica si ya está en el Set
    codes.add(codigo); // Agrega el código al Set
    try {
      await Codigo.create({
        codigo: codigo.toString(), // Cambia "code" a "codigo"
        monto: 1000000, // Cambia "prize" a "monto"
        estado: 'por reclamar', // Estado inicial
      });
    } catch (error) {
      if (error.code !== 11000) {
        // Si no es un error de duplicado, lanza el error
        throw error;
      }
    }
  }

  // Generar códigos de 500 mil
  for (let i = 0; i < 150; i++) {
    let codigo; // Cambia el nombre de la variable a "codigo"
    do {
      codigo = Math.floor(Math.random() * 900) + 100; // Genera un código aleatorio de 3 dígitos
    } while (codes.has(codigo)); // Verifica si ya está en el Set
    codes.add(codigo); // Agrega el código al Set
    try {
      await Codigo.create({
        codigo: codigo.toString(), // Cambia "code" a "codigo"
        monto: 500000, // Cambia "prize" a "monto"
        estado: 'por reclamar', // Estado inicial
      });
    } catch (error) {
      if (error.code !== 11000) {
        throw error;
      }
    }
  }

  // Generar códigos de 50 mil
  for (let i = 0; i < 200; i++) {
    let codigo; // Cambia el nombre de la variable a "codigo"
    do {
      codigo = Math.floor(Math.random() * 900) + 100; // Genera un código aleatorio de 3 dígitos
    } while (codes.has(codigo)); // Verifica si ya está en el Set
    codes.add(codigo); // Agrega el código al Set
    try {
      await Codigo.create({
        codigo: codigo.toString(), // Cambia "code" a "codigo"
        monto: 50000, // Cambia "prize" a "monto"
        estado: 'por reclamar', // Estado inicial
      });
    } catch (error) {
      if (error.code !== 11000) {
        throw error;
      }
    }
  }

  console.log('Códigos insertados exitosamente.');
  mongoose.connection.close(); // Cierra la conexión después de completar la inserción
}

// Llama a la función para insertar los códigos
seedCodes().catch((error) => {
  console.error('Error al insertar códigos:', error);
  mongoose.connection.close(); // Asegúrate de cerrar la conexión en caso de error
});
