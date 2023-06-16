const { response } = require('express')
const Colegio = require('../models/colegio')

//Consulta
const getColegio = async (req, res = response) => {
    let mensaje = ''
    try {
       
        const colegios = await Colegio.find()
        mensaje = colegios
    } catch (error) {
        mensaje = error
    }

    res.json({
        colegios: mensaje
    })
}

//Registrar
const postColegio = async (req, res = response) => {

    const body = req.body
    let mensaje = ''
    const colegio = new Colegio(body)

    try {
        await colegio.save()
        mensaje = 'Colegio registrado exitosamente'
    } catch (error) {
        mensaje = error
    }

    res.json({
        mensaje
    })
}

//Editar
const putColegio = async (req, res = response) => {
    const body = req.body 
    let mensaje = ''

    try {
        if(body.tipoModificacion == 'Unitaria'){
            await Colegio.findOneAndUpdate({_id: body._id}, {latitud: body.latitud, longitud: body.longitud, descripcion: body.descripcion})
            mensaje = 'Colegio modificado exitosamente. Modificación: Sencilla'
        }
        else{
            await Colegio.updateMany({direccion: body.direccion}, {latitud: body.latitud, longitud: body.longitud, descripcion: body.descripcion})
            mensaje = 'Colegio modificado exitosamente. Modificación: Multiple'
        }
    } catch (error) {
        mensaje = error
    }
    res.json({
        mensaje: mensaje
    })
}
//Eliminar
const deleteColegio = async(req, res = response) => {
    const body = req.body 
    let mensaje = ''

    try{
        await Colegio.deleteOne({_id: body._id})
        mensaje = 'Colegio eliminado exitosamente'
    }catch(error){
        mensaje = error
    }
    res.json({
        mensaje
    })
}
module.exports = {
   getColegio,
   postColegio,
   putColegio,
   deleteColegio
}