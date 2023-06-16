const express = require('express')

const cors = require('cors') //Implementar seguridad

const bodyParser = require('body-parser')// Recibir datos

const dbConection = require('../database/config')

class server {

    constructor (){
        this.app = express()

        this.PORT = process.env.PORT 

        this.colegioPath = '/api/colegio'

        this.middlewares() //Seguridad

        this.routes()

        this.dbConectar()
    }

    middlewares(){ //Directorio publico
        this.app.use(express.static(__dirname + "/public"));
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }

    routes(){
        this.app.use(this.colegioPath, require('../routes/colegio'))
    }

    async dbConectar(){
        await dbConection()
    }

    listen(){
        this.app.listen(this.PORT, () =>{
            console.log(`Escuchando por el puerto ${this.PORT}`)
        })
    }
}

//Exportar la clase server
module.exports = server
