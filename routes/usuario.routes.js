const validateUsuario = require('../middleware/validateUsuario')
const userController = require('../controller/usuario.controller')

const express = require('express')
const router = express.Router()

router.post('/entrar', userController.login)
router.post('/cadastro', userController.registerNewUser)
router.patch('/emprestar_livro', validateUsuario, userController.borrowBook)
router.patch('/devolver_livro', validateUsuario, userController.returnBook)
router.get('/consultar_emprestimos', validateUsuario, userController.getEmprestimos)


module.exports = router