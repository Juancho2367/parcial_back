const express = require('express');
const { urlencoded, json } = require('express');
const cors = require('cors');
const router = require('./routes/userRoutes');
const { connectDb } = require('./config/db'); // Importa connectDb
require('dotenv').config();

const app = express();

// Middleware
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

// Ruta raíz
app.get('/', (req, res) => {
    res.send("API en funcionamiento");
});

// Rutas de usuario
app.use('/api/users', router);


// Conectar a la base de datos
connectDb().then(() => {
    // Iniciar el servidor solo después de conectar a la base de datos
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Servidor corriendo en el puerto ${port}`);
    });
}).catch((error) => {
    console.error("Error al iniciar el servidor:", error);
});
