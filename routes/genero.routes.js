const generoController = require('../controller/genero.controller')

const express = require('express')
const router = express.Router()

/*OK*/router.get('/ver_generos', generoController.getGenders)

module.exports = router