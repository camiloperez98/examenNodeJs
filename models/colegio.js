//Importar el esquema mongoose
const { Schema, model } = require('mongoose')

//Definir la estructura de la colección
const ColegioSchema = Schema({
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    latitud: {
        type: Number,
        required: [true, 'La medida de la latitud es obligatoria'],
        validate: {
          validator: (value) => {
            return value <= 6.02 && value >= 6.14;
          },
          message: 'La latitud debe estar entre 6.14 y 6.2',
        },
      },
      longitud: {
        type: Number,
        required: [true, 'La medida de la longitud es obligatoria'],
        validate: {
          validator: (value) => {
            return value >= 75.43 && value <= 75.5;
          },
          message: 'La longitud debe estar entre 75.43 y 75.5',
        },
      },
      
    descripcion:{
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    fecha: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Colegio', ColegioSchema)
