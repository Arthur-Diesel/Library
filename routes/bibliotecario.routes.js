const bibliotecarioController = require('../controller/bibliotecario.controller')
const validateBibliotecario = require ('../middleware/validateBibliotecario')

const express = require('express')
const router = express.Router()

// router.get('/ver_bibliotecarios')
/*OK*/router.post('/entrar', bibliotecarioController.loginBibliotecario)
/*OK*/router.post('/cadastro', validateBibliotecario, bibliotecarioController.registerBibliotecario)
/*OK*/router.post('/cadastrar_livro', validateBibliotecario, bibliotecarioController.newBook) 
/*OK*/router.delete('/deletar_livro', validateBibliotecario, bibliotecarioController.deleteBook) 
/*OK*/router.post('/cadastrar_genero', validateBibliotecario, bibliotecarioController.newGenero)
/*OK*/router.delete('/deletar_genero', validateBibliotecario, bibliotecarioController.deleteGenero)
/*OK*/router.post('/cadastrar_idioma', validateBibliotecario, bibliotecarioController.newIdioma)
/*OK*/router.delete('/deletar_idioma', validateBibliotecario, bibliotecarioController.deleteIdioma)
/*OK*/router.post('/cadastrar_autor', validateBibliotecario, bibliotecarioController.newAuthor)
/*OK*/router.delete('/deletar_autor', validateBibliotecario, bibliotecarioController.deleteAuthor)
router.patch('/alterar_data_morte_autor', validateBibliotecario, bibliotecarioController.alterAuthorDeathDate)
/*OK*/router.post('/cadastrar_nacionalidade', validateBibliotecario, bibliotecarioController.newNationality)
/*OK*/router.delete('/deletar_nacionalidade', validateBibliotecario, bibliotecarioController.deleteNationality)

module.exports = router