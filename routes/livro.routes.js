const livroController = require('../controller/livro.controller.js')

const express = require('express')
const router = express.Router()

/*OK*/router.get('/ver_livros', livroController.getBooks)

module.exports = router