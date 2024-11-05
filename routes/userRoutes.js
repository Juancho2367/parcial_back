const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/ingresar-codigo', userController.reclamarCodigo);
router.get('/:userId/history', userController.obtenerHistorial);
router.post('/loginAD', userController.loginAdmin);
router.get('/registroAD', userController.registerAdmin);

module.exports = router;