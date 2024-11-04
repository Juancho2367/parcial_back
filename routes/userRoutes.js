const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/ingresar-codigo', userController.reclamarCodigo);
router.get('/historial', userController.obtenerHistorial);

module.exports = router;