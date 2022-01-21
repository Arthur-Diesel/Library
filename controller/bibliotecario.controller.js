const jwt = require('jsonwebtoken')
const bibliotecarioService = require('../service/bibliotecario.service')
const livrosService = require('../service/livros.service')
const idiomaService = require('../service/idioma.service')
const generoService = require('../service/genero.service')
const autorService = require('../service/autor.service')
const nacionalidadeService = require('../service/nacionalidade.service')
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
            if(result.length >= 1){
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

function newIdioma(req, res){
    let idioma = req.body.idioma
    let bibliotecarioResponsavel = req.responsavel
    
    if(idioma == undefined){
        res.status(400).json({mensagem: 'Idioma não foi informado!'})
        return
    }

    idiomaService.addIdioma(idioma, bibliotecarioResponsavel)
        .then((result) => {
            res.status(201).json({mensagem: 'O idioma foi adicionado com sucesso!'})
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })

}

function newNationality(req, res){
    let nacionalidade = req.body.nacionalidade
    let bibliotecarioResponsavel = req.responsavel

    if(nacionalidade == undefined){
        res.status(400).json({mensagem: 'Nacionalidade não foi informado!'})
    }

    nacionalidadeService.addNacionalidade(nacionalidade, bibliotecarioResponsavel)
        .then((result) => {
            res.status(201).json({mensagem: 'A nacionalidade foi adicionada com sucesso!'})
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

function newGenero(req, res){
    let genero = req.body.genero
    let bibliotecarioResponsavel = req.responsavel

    if(genero == undefined){
        res.status(400).json({mensagem: 'Idioma não foi informado!'})
        return
    }

    generoService.addGenero(genero, bibliotecarioResponsavel)
        .then((result) => {
            res.status(201).json({mensagem: 'O gênero foi adicionado com sucesso!'})
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

function newAuthor(req, res){
    
    let nome = req.body.nome
    let idNacionalidade = req.body.idNacionalidade
    let dataNascimento = req.body.dataNascimento
    let dataMorte = req.body.dataMorte
    let bibliotecarioResponsavel = req.responsavel

    if(nome == undefined || idNacionalidade == undefined || dataNascimento == undefined){
        res.status(400).json({mensagem: 'Faltam campos para o registro do autor!'})
        return
    }

    if(dataMorte){
        autorService.addAutorWithDeathDate(nome, idNacionalidade, dataNascimento, dataMorte, bibliotecarioResponsavel)
            .then((result) => {
                res.status(201).json({mensagem: 'O autor foi adicionado com sucesso!'})
            })
            .catch((err) => {
                console.log('Houve um erro!\n' + err)
                res.status(500).json({mensagem: 'Houve um erro no sistema!'})
            })
    } else {
        autorService.addAutorWithoutDeathDate(nome, idNacionalidade, dataNascimento, bibliotecarioResponsavel)
        .then((result) => {
            res.status(201).json({mensagem: 'O autor foi adicionado com sucesso!'})
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
    }

}

function alterAuthorDeathDate(req, res){
    let idAutor = req.body.idAutor
    let dataMorte = req.body.dataMorte

    if(idAutor == undefined || dataMorte == undefined){
        res.status(400).json({mensagem: 'Faltam campos para a alteração da data de morte do autor!'})
        return
    }

    autorService.updateDeathDate(idAutor, dataMorte)
        .then((result) => {
            res.status(200).json({mensagem: 'A data de morte do autor foi alterada com sucesso!'})
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

function deleteAuthor(req, res){
    let idAutor = req.body.idAutor

    if(idAutor == undefined){
        res.status(400).json({mensagem: 'Faltam campos para a remoção do autor!'})
        return
    }

    autorService.removeAutor(idAutor)
        .then((result) => {
            res.status(200).json({mensagem: 'O autor foi removido com sucesso!'})
        })  
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

function deleteNationality(req, res){
    let idNacionalidade = req.body.idNacionalidade

    if(idNacionalidade == undefined){
        res.status(400).json({mensagem: 'Faltam campos para a remoção da nacionalidade!'})
        return
    }

    nacionalidadeService.removeNacionalidade(idNacionalidade)
        .then((result) => {
            res.status(200).json({mensagem: 'A nacionalidade foi removida com sucesso!'})
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

function newBook(req, res){

    let titulo = req.body.titulo
    let idAutor = req.body.idAutor
    let ano = req.body.ano
    let paginas = req.body.paginas
    let idGenero = req.body.idGenero
    let idIdioma = req.body.idIdioma
    let bibliotecarioResponsavel = req.responsavel

    if (titulo == undefined || idAutor == undefined || ano == undefined || paginas == undefined || idGenero == undefined || idIdioma == undefined) {
        res.status(400).json({mensagem: 'Faltam campos para o registro do livro!'})
        return
    }

    livrosService.addBook(titulo, idAutor, ano, paginas, idGenero, idIdioma, bibliotecarioResponsavel)
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
        res.status(400).json({mensagem: 'Para a remoção do livro é necessário seu id!'})
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

function deleteGenero(req, res){
    let idGenero = req.body.idGenero

    if (idGenero == undefined){
        res.status(400).json({mensagem: 'Para a remoção do gênero é necessário seu id!'})
        return
    }

    generoService.removeGenero(idGenero)
        .then((result) => {
            res.status(200).json({mensagem: 'O gênero foi removido com sucesso!'})
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })

}

function deleteIdioma(req, res){
    let idIdioma = req.body.idIdioma    

    if (idIdioma == undefined){
        res.status(400).json({mensagem: 'Para a remoção do idioma é necessário seu id!'})
        return
    }
    
    idiomaService.removeIdioma(idIdioma)
        .then((result) => {
            res.status(200).json({mensagem: 'O idioma foi removido com sucesso!'})
        })
        .catch((err) => {
            console.log('Houve um erro!\n' + err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })


}

module.exports = {
    registerBibliotecario,
    loginBibliotecario,
    newBook,
    deleteBook,
    newGenero,
    deleteGenero,
    newIdioma,
    deleteIdioma,
    newAuthor,
    deleteAuthor,
    alterAuthorDeathDate,
    newNationality,
    deleteNationality
}