const jwt = require('jsonwebtoken')
const userService = require('../service/usuario.service')
const emprestimoService = require('../service/emprestimo.service')
const livroService = require('../service/livros.service')

require('dotenv').config()

var privateKey = process.env.JWT_KEY

function registerNewUser(req, res){
    let nome = req.body.nome
    let email = req.body.email
    let senha = req.body.senha

    if (nome == undefined || email == undefined || senha == undefined) {
        res.status(400).json({mensagem: 'Faltam campos para o registro do usuário!'})
        return
    }

    userService.findUser(email)
        .then((result) => {
            if(result.length >= 1){
                res.status(400).json({mensagem: 'O usuário já está cadastrado!'})
            } else {
                userService.registerUser(nome, email, senha)
                    .then((result) => {
                        res.status(201).json({mensagem: 'O usuário foi cadastrado com sucesso!'})
                    })
                    .catch((err) => {
                        console.log('Houve um erro!\n' + err)
                        res.status(500).json({mensagem: 'Houve um erro no sistema!'})
                    })
            }
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

function login(req, res){
    let email = req.body.email
    let senha = req.body.senha

    if (email == undefined || senha == undefined) {
        res.status(400).json({mensagem: 'Faltam campos para o login do usuário!'})
        return
    }

    userService.findUserWithPassword(email, senha)
        .then((result) => {
            let token = jwt.sign({
                cargo: 'Usuário',
                email: email,
              }, privateKey, { expiresIn: '1h' })

            res.status(200).json({mensagem: 'O usuário foi encontrado!', jwt: token})

        })
        .catch((err) => {
            if(err = 'O usuário não foi encontrado!') {
                res.status(400).json({mensagem: err})
            } else {
                console.log('Houve um erro!\n' + err)
                res.status(500).json({mensagem: 'Houve um erro no sistema!'})
            }
        })
}

function borrowBook(req, res){
    let responsavel = req.responsavel
    userService.findUser(responsavel)
        .then((result) => {

            let idUsuario = result[0].idUsuario
            let idLivro = req.body.idLivro

            let dateToday = new Date()
            let dateSevenDays = new Date()
            dateSevenDays.setDate(dateSevenDays.getDate() + 7)
            let dataEmprestimo = dateToday.toISOString().split('T')[0]
            let dataDevolucao = dateSevenDays.toISOString().split('T')[0]

            emprestimoService.findEmprestimoEmAndamentoOrPendente(idUsuario)
                .then((result) => {
                    if(result.length >= 1){
                        res.status(400).json({mensagem: 'O Usuário já possui um empréstimo pendente ou em andamento ou o livro!'})
                    } else {
                        emprestimoService.findStatusEmprestimoLivro(idLivro)
                        .then((result) => {
                            if(result.length == 0){
                                emprestimoService.newEmprestimo(idUsuario, idLivro, dataEmprestimo, dataDevolucao)
                                    .then((result) => {
                                        livroService.alterStatusBookEmprestado(idLivro)
                                        res.status(200).json({mensagem: 'O livro foi emprestado com sucesso!'})
                                    })
                            } else {
                                let statusEmprestimo = result[0].statusEmprestimo
                                if(statusEmprestimo == 'Em Andamento' || statusEmprestimo == 'Pendente'){
                                    res.status(400).json({mensagem: 'O livro já está emprestado!'})
                                } else {
                                    emprestimoService.newEmprestimo(idUsuario, idLivro, dataEmprestimo, dataDevolucao)
                                    .then((result) => {
                                        livroService.alterStatusBookEmprestado(idLivro)
                                        res.status(200).json({mensagem: 'O livro foi emprestado com sucesso!'})
                                    })
                                }
                            }
                        })
                    }
                })
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })                

}

function returnBook(req, res){
    let responsavel = req.responsavel
    let idEmprestimo = req.body.idEmprestimo

    userService.findUser(responsavel)
        .then((result) => {
            let idUsuario = result[0].idUsuario
            emprestimoService.findStatusEmprestimoUsuario(idEmprestimo, idUsuario)
                .then((result) => {
                    if(result.length == 0){
                        res.status(400).json({mensagem: 'O empréstimo não é seu ou não foi encontrado!'})
                    } else {
                        let statusEmprestimo = result[0].statusEmprestimo
                        if (statusEmprestimo == 'Pendente' || 'Em Andamento'){
                            emprestimoService.newDevolucao(idUsuario, idEmprestimo)
                            .then((result) => {
                                emprestimoService.findBook(idEmprestimo)
                                    .then((result) => {
                                        livroService.alterStatusBookLivre(result[0].idLivro)
                                        res.status(200).json({mensagem: 'O livro foi devolvido com sucesso!'})
                                    })                            
                            })
                        } else {
                            res.status(404).json({mensagem: 'O emprestímo já foi encerrado ou ele não existe!'})
                        }   
                    }
                })
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

function getEmprestimos(req, res){
    let responsavel = req.responsavel
    userService.findUser(responsavel)
        .then((result) => {
            let idUsuario = result[0].idUsuario
            emprestimoService.findEmprestimos(idUsuario)
                .then((result) => {
                    res.status(200).json({emprestimos: result})
                })
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

function getDivida(req, res){
    let responsavel = req.responsavel
    userService.findUser(responsavel)
        .then((result) => {
            let idUsuario = result[0].idUsuario
            userService.findDivida(idUsuario)
                .then((result) => {
                    let divida = result[0].divida
                    res.status(200).json({divida: divida})
                })
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

function deleteDivida(req, res){
    let responsavel = req.responsavel
    let quantidadePagamento = req.body.quantidadePagamento

    userService.findUser(responsavel)
        .then((result) => {
            let idUsuario = result[0].idUsuario
            userService.getDivida(idUsuario)
            .then((result) => {
                let divida = result[0].divida
                if(quantidadePagamento > divida){
                    res.status(400).json({mensagem: 'O pagamento é maior que sua divida atual!', divida: divida})
                } else {
                    userService.removeDivida(idUsuario, quantidadePagamento)
                        .then((result) => {
                            res.status(200).json({mensagem: `${quantidadePagamento} foi descontado de sua divida!`})
                        })
                }
            })
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

module.exports = {
    registerNewUser,
    login,
    borrowBook,
    returnBook,
    getEmprestimos,
    getDivida,
    deleteDivida
}