require('dotenv').config(); //Cargar toda la importacion

const Server = require('./models/server')

const server = new Server() //Creando un objeto de Server

server.listen()