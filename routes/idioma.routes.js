const idiomaController = require('../controller/idioma.controller')

const express = require('express')
const router = express.Router()

/*OK*/router.get('/ver_idiomas', idiomaController.getLanguages)

module.exports = router