const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.login);
router.post('/ingresar-codigo', userController.ingresarCodigo);
router.get('/historial', userController.obtenerHistorial);

module.exports = router;