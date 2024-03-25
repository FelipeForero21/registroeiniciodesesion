// Importa los módulos necesarios
const express = require('express');
const bodyParser = require('body-parser'); // Corregido: 'body-parse' -> 'body-parser'

// Importa la función para conectar a la base de datos desde './config/database'
const connectDatabase = require('./config/database');

// Importa las rutas desde './routes/index.js'
const routes = require('./routes/index.js');

const auth = require("./middleware/auth")

// Crea una instancia de la aplicación Express
const app = express();

// Configura el puerto en el que el servidor va a escuchar
const port = 3000;

// Conecta a la base de datos MongoDB
connectDatabase();

// Middleware para procesar datos en formato JSON
app.use(bodyParser.json());

// Middleware para procesar datos de formularios HTML
app.use(bodyParser.urlencoded({ extended: false }));

app.use(auth.initialize())

// Utiliza las rutas importadas desde './routes/index.js'
app.use('/', routes);

// Configura el servidor para escuchar en el puerto especificado
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));


