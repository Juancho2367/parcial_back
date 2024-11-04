const express = require('express');
const router = express.Router();
const Code = require('../models/code'); // Asegúrate de que la ruta sea correcta
const User = require('../models/user'); // Importa el modelo de usuario si es necesario

// Ruta para reclamar un código
router.post('/redeem', async (req, res) => {
    const { code, userId } = req.body;

    if (!code || !userId) {
        return res.status(400).json({ message: 'Código y userId son requeridos.' });
    }

    try {
        // Busca el código en la base de datos
        const foundCode = await Code.findOne({ codigo: code });

        if (!foundCode) {
            return res.status(404).json({ message: 'Código no encontrado.' });
        }

        // Aquí puedes agregar lógica adicional para verificar si el código ya fue reclamado, etc.

        // Supongamos que encuentras el usuario y lo actualizas
        await User.findByIdAndUpdate(userId, { $push: { reclamos: { codigo: foundCode.codigo, montoGanado: foundCode.monto, estado: 'Reclamado', fechaReclamo: new Date() } } });

        // Marca el código como reclamado o lo que necesites hacer
        await Code.findByIdAndUpdate(foundCode._id, { estado: 'reclamado' });

        res.status(200).json({ message: 'Código reclamado exitosamente.', montoGanado: foundCode.monto });
    } catch (error) {
        console.error('Error al reclamar el código:', error);
        res.status(500).json({ message: 'Error al reclamar el código. Intente de nuevo más tarde.' });
    }
});

module.exports = router;
