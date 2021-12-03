const livroController = require('../controller/livro.controller.js')

const express = require('express')
const router = express.Router()

router.get('/ver_livros', livroController.getBooks)

module.exports = router