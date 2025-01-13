const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', (req, res) => {
  console.log('Solicitud de registro recibida:', req.body); // Mensaje de depuración
  authController.register(req, res);
});

router.post('/login', (req, res) => {
  console.log('Solicitud de inicio de sesión recibida:', req.body); // Mensaje de depuración
  authController.login(req, res);
});

module.exports = router;