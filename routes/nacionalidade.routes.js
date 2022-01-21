const nacionalidadeController = require('../controller/nacionalidade.controller')

const express = require('express')
const router = express.Router()

/*OK*/router.get('/ver_nacionalidades', nacionalidadeController.getNationalities)

module.exports = router