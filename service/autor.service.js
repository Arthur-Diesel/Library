const mysqlConfig = require('../db/config')

function addAutorWithDeathDate(nome, idNacionalidade, dataNascimento, dataMorte, bibliotecarioResponsavel){
    return new Promise((resolve, reject) => {
        mysqlConfig.query("INSERT INTO autor (nome, idNacionalidade, dataNascimento, dataMorte, bibliotecarioResponsavel) VALUES (?, ?, ?, ?, ?)", [nome, idNacionalidade, dataNascimento, dataMorte, bibliotecarioResponsavel ], (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function addAutorWithoutDeathDate(nome, idNacionalidade, dataNascimento, bibliotecarioResponsavel){
    return new Promise((resolve, reject) => {
        mysqlConfig.query("INSERT INTO autor (nome, idNacionalidade, dataNascimento, bibliotecarioResponsavel) VALUES (?, ?, ?, ?)", [nome, idNacionalidade, dataNascimento, bibliotecarioResponsavel ], (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function updateDeathDate(idAutor, dataMorte){
    return new Promise((resolve, reject) => {
        mysqlConfig.query("UPDATE autor SET dataMorte = ? WHERE idAutor = ? ", [dataMorte, idAutor], (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function removeAutor(idAutor){
    return new Promise((resolve, reject) => {
        mysqlConfig.query("DELETE FROM autor WHERE idAutor = ?", [idAutor], (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function findAutores(){
    return new Promise((resolve, reject) => {
        mysqlConfig.query("SELECT * FROM autor", (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

module.exports = {
    addAutorWithDeathDate,
    addAutorWithoutDeathDate,
    updateDeathDate,
    removeAutor,
    findAutores
}