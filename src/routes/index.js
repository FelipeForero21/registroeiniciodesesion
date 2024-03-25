// Importa el módulo 'express' para crear el enrutador
const express = require('express');
// Crea un enrutador utilizando el método Router de express
const router = express.Router();
// Importa el controlador de usuarios desde '../controllers/userController'
const userController = require('../controllers/userController');

// Define las rutas y los métodos del controlador que manejarán las solicitudes HTTP

// Ruta para crear un nuevo usuario (POST /nuevos)
router.post('/nuevos', userController.creacionDeUsuario);

// Ruta para obtener todas las notas (GET /usuarios)
router.get('/usuarios', userController.obtenerTodasLasNotas);

// Ruta para obtener un usuario específico por nombre (GET /usuarios/:nombres1)
router.get('/usuarios/:nombres1', userController.obtenerDeterminadoUsuario);

router.post("/register", userController.register)
router.post("/login", userController.login)

// Exporta el enrutador para que pueda ser utilizado en otros archivos del proyecto
module.exports = router;
