const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://juanquintero05:Iatge8E4pLQvfDln@juandacho.3pujv.mongodb.net/?retryWrites=true&w=majority&appName=Juandacho', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error al conectar MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;