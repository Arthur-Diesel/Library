const jwt = require('jsonwebtoken')
const bibliotecarioService = require('../service/bibliotecario.service')
const livrosService = require('../service/livros.service')
require('dotenv').config()

var privateKey = process.env.JWT_KEY

function registerBibliotecario(req, res){
    let nome = req.body.nome
    let email = req.body.email
    let senha = req.body.senha

    if(nome == undefined || email == undefined || senha == undefined) {
        res.status(400).json({mensagem: 'Faltam campos para o registro do bibliotecário!'})
        return
    }


    bibliotecarioService.findBibliotecarioWithEmail(email)
        .then((result) => {
            if(result.length >= 0){
                res.status(400).json({mensagem: 'O Bibliotecário já está cadastrado!'})
            } else {
                bibliotecarioService.addBibliotecario(nome, email, senha)
                .then((result) => {
                    res.status(200).json({mensagem: 'O Bibliotecário foi cadastrado com sucesso!'})
                })
            }
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

function loginBibliotecario(req, res){
    let email = req.body.email
    let senha = req.body.senha

    if(email == undefined || senha == undefined) {
        res.status(400).json({mensagem: 'Faltam campos para o login do bibliotecário!'})
        return
    }

    bibliotecarioService.findBibliotecarioWithEmailAndPassword(email, senha)
        .then((result) => {
            if(result.length >= 1){
                let token = jwt.sign({
                    cargo: 'Bibliotecário',
                    email: email,
                  }, privateKey, { expiresIn: '1h' })
                res.status(200).json({mensagem: 'O bibliotecário foi encontrado!', jwt: token})
            } else {
                res.status(404).json({mensagem: 'O bibliotecário não foi encontrado!'})
            }
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

function newBook(req, res){
    console.log('/bibliotecario/adicionar_livro')

    let titulo = req.body.titulo
    let autor = req.body.autor
    let ano = req.body.ano
    let paginas = req.body.paginas
    let genero = req.body.genero
    let lingua = req.body.lingua
    let bibliotecarioResponsavel = req.responsavel

    if (titulo == undefined || autor == undefined || ano == undefined || paginas == undefined || genero == undefined || lingua == undefined) {
        res.status(400).json({mensagem: 'Faltam campos para o registro do livro!'})
        return
    }

    let datetime = new Date()
    let dataInsercao = datetime.toISOString().split('T')[0]

    livrosService.addBook(titulo, autor, ano, paginas, genero, lingua, bibliotecarioResponsavel, dataInsercao)
        .then((result) => {
            res.status(201).json({mensagem: 'O livro foi adicionado com sucesso!', idLivro: result.insertId})
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })

}

function deleteBook(req, res){

    let idLivro = req.body.idLivro

    if (idLivro == undefined){
        res.status(400).json({mensagem: 'Para a remoção do livro é necessário seu título!'})
        return
    }

    livrosService.removeBook(idLivro)
        .then((result) => {
            res.status(201).json({mensagem: 'O livro foi removido com sucesso!'})
        })
        .catch((err) => {
            if(err == 404){
                res.status(404).json({mensagem: 'O livro não foi encontrado!'})
            } else {
                console.log('Houve um erro!\n' + err)
                res.status(500).json({mensagem: 'Houve um erro no sistema!'})
            }
        })

}

module.exports = {
    registerBibliotecario,
    loginBibliotecario,
    newBook,
    deleteBook
}