const autorController = require('../controller/autor.controller')

const express = require('express')
const router = express.Router()

/*OK*/router.get('/ver_autores', autorController.getAuthors)

module.exports = router