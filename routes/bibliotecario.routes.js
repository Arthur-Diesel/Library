const bibliotecarioController = require('../controller/bibliotecario.controller')
const validateBibliotecario = require ('../middleware/validateBibliotecario')

const express = require('express')
const router = express.Router()

router.post('/entrar', bibliotecarioController.loginBibliotecario)
router.post('/cadastro', validateBibliotecario, bibliotecarioController.registerBibliotecario)
router.post('/cadastrar_livro', validateBibliotecario, bibliotecarioController.newBook)
router.delete('/deletar_livro', validateBibliotecario, bibliotecarioController.deleteBook)

module.exports = router