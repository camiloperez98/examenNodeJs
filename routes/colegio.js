const { Router } = require('express')

const route = Router()

//Importar el controlador
const { getColegio, postColegio, putColegio, deleteColegio } = require('../controllers/colegio')

route.get('/', getColegio)

route.post('/', postColegio)

route.put('/', putColegio)

route.delete('/', deleteColegio)

module.exports = route