// Importa el módulo 'mongoose' para trabajar con MongoDB
const mongoose = require('mongoose');
let User; // Variable global para el modelo de usuario

// Función asincrónica para conectar a la base de datos
const connectDatabase = async () => {
    try {
        // Verifica si el modelo de usuario no ha sido creado previamente
        if (!User) {
            // Crea el modelo 'User' utilizando el esquema del archivo '../models/userModel'
            User = mongoose.model('User', require('../models/userModel').schema);
        }

        // Conecta a la base de datos MongoDB utilizando la cadena de conexión proporcionada
        await mongoose.connect('mongodb+srv://elipeforero21:elipeforero21@cluster0.laag0sa.mongodb.net/')
            .then(() => console.log('Connected to MongoDB')) // Mensaje de conexión exitosa
            .catch((err) => console.log(err)); // Manejo de errores en la conexión
    } catch (error) {
        console.error('Failed to connect to MongoDB', error); // Mensaje de error en la conexión
        process.exit(1); // Termina el proceso con un código de error
    }
};

// Exporta la función connectDatabase para que pueda ser utilizada en otros archivos del proyecto
module.exports = connectDatabase;
