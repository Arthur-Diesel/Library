const mysqlConfig = require('../db/config')

function addBook(titulo, autor, ano, paginas, genero, lingua, bibliotecarioResponsavel, dataInsercao){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`INSERT INTO livro (titulo, autor, ano, paginas, genero, lingua, bibliotecarioResponsavel, dataInsercao) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [titulo,autor,ano,paginas,genero,lingua,bibliotecarioResponsavel,dataInsercao],
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
        mysqlConfig.query(`SELECT idLivro, titulo, autor, ano, paginas, genero, lingua, statusLivro FROM livro`,
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