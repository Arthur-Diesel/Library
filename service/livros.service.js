const mysqlConfig = require('../db/config')

function addBook(titulo, idAutor, ano, paginas, idGenero, idIdioma, bibliotecarioResponsavel){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`INSERT INTO livro (titulo, idAutor, ano, paginas, idGenero, idIdioma, bibliotecarioResponsavel) VALUES (?, ?, ?, ?, ?, ?, ?)`, [titulo,idAutor,ano,paginas, idGenero, idIdioma, bibliotecarioResponsavel],
        (err, result, fields) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function removeBook(idLivro){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`DELETE FROM livro WHERE idLivro = ?`, [idLivro],
        (err, result, fields) => {
            if (err) {
                return reject(err)
            } else {
                if(result.affectedRows === 0){
                    erro = 404
                    return reject(erro)
                } else {
                    return resolve (result)
                }
            }
        })
    })
}

function findBooks(){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`SELECT li.idLivro, li.titulo, li.idAutor, au.nome, li.ano, li.paginas, li.idGenero, ge.genero, li.idIdioma, id.idioma, li.statusLivro FROM livro li INNER JOIN genero ge ON li.idGenero = ge.idGenero INNER JOIN idioma id ON li.idIdioma = id.idIdioma INNER JOIN autor au ON li.idAutor = au.idAutor`,
        (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function alterStatusBookEmprestado(idLivro){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`UPDATE livro SET statusLivro = 'Emprestado' WHERE idLivro = ?`, [idLivro],
        (err,result,fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function alterStatusBookLivre(idLivro){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`UPDATE livro SET statusLivro = 'Livre' WHERE idLivro = ?`, [idLivro],
        (err,result,fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

module.exports = {
    addBook,
    removeBook,
    findBooks,
    alterStatusBookEmprestado,
    alterStatusBookLivre
}