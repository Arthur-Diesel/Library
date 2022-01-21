const validateUsuario = require('../middleware/validateUsuario')
const userController = require('../controller/usuario.controller')

const express = require('express')
const router = express.Router()

/*OK*/router.post('/entrar', userController.login)
/*OK*/router.post('/cadastro', userController.registerNewUser)
/*OK*/router.patch('/emprestar_livro', validateUsuario, userController.borrowBook)
/*OK*/router.patch('/devolver_livro', validateUsuario, userController.returnBook)
/*OK*/router.get('/consultar_emprestimos', validateUsuario, userController.getEmprestimos)
/*OK*/router.get('/consultar_divida', validateUsuario, userController.getDivida)
/*OK*/router.patch('/pagar_divida', validateUsuario, userController.deleteDivida)

module.exports = router