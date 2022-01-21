const mysqlConfig = require('../db/config')

function addGenero(genero, bibliotecarioResponsavel){
    return new Promise((resolve, reject) => {
        mysqlConfig.query("INSERT INTO genero (genero, bibliotecarioResponsavel) VALUES (?, ?)", [genero, bibliotecarioResponsavel ], (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function removeGenero(idGenero){
    return new Promise((resolve, reject) => {
        mysqlConfig.query("DELETE FROM genero WHERE idGenero = ?", [idGenero], (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function findGeneros(){
    return new Promise((resolve, reject) => {
        mysqlConfig.query("SELECT * FROM genero", (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

module.exports = {
    addGenero,
    removeGenero,
    findGeneros
}