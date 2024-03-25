const notas = require('../models/userModel');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const jwt_secret = "1234567890.zxcvbnmñlkjhgfdsaqwertyuiopÑPOLFJDFSHWQAXCVC5ZC6ZSDC#@|"


const userController = {
    creacionDeUsuario: async (req, res) => {
        try {
            // Se crea un nuevo documento de usuario utilizando los datos del cuerpo de la solicitud
            const nuevoUsuario = new notas({
                nombre: req.body.nombre,
                email: req.body.email,
                email: req.body.password,

            });
            // Se guarda el nuevo usuario en la base de datos
            await nuevoUsuario.save();
            // Se responde con un mensaje indicando que el usuario se ha creado correctamente
            res.status(201).json({
                message: 'Usuario creado correctamente'
            });
        } catch (error) {
            // Si ocurre un error, se responde con un mensaje indicando que hubo un error al crear el usuario
            res.status(500).json({
                message: 'Error al crear usuario'
            });
        }
    },

    // Método para obtener todas las notas de la base de datos
    obtenerTodasLasNotas: async (req, res) => {
        try {
            // Se obtienen todas las notas utilizando el método find del modelo notas
            const todasLasNotas = await notas.find();
            // Se responde con un JSON que contiene todas las notas encontradas
            res.json(todasLasNotas);
        } catch (error) {
            // Si ocurre un error, se responde con un mensaje indicando que hubo un error en el servidor
            console.log(error);
            res.status(400).json({ message: 'Error en el servidor' });
        }
    },

    // Método para obtener un usuario específico según el nombre proporcionado en los parámetros de la solicitud
    obtenerDeterminadoUsuario: async (req, res) => {
        try {
            const { nombres1 } = req.params;
            const nombres = await notas.find({ nombre: { $regex: new RegExp(nombres1, "i") } });
            res.json(nombres);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Error en el servidor' });
        }
    },
    


    register: async (req, res) => {
        try {

            const {nombre, email, password} = req.body;
            const todosLosUsuarios = await notas.find();

            const userData ={
                userid: todosLosUsuarios.length + 1,
                nombre: nombre,
                email: email,
                password: await bcrypt.hash(password,10)
            }

            const newUser = new notas(userData);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser)
         
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Error al crear usuario'
            })        }
    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await notas.find({email:email});
            if(!user){
                return res.status(400).json({message: "Invalid Username o Password"});
            }

            const isPasswordValid = await bcrypt.compare(password, user[0].password);

            if(!isPasswordValid){
                return res.status(400).json({message: "invalid username o password"})
            }

            const token = jwt.sign({userid: user.id}, jwt_secret,{
                expiresIn: "1h"
            })

            res.json({message: "logged in succesfully", token})
         
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Error al crear usuario'
            })        }
    },
};

// Se exporta el objeto userController para que pueda ser utilizado en otros archivos del proyecto
module.exports = userController;
