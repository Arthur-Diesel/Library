const mysqlConfig = require('../db/config')

function addNacionalidade(nacionalidade, bibliotecarioResponsavel){
    return new Promise((resolve, reject) => {
        mysqlConfig.query("INSERT INTO nacionalidade (nacionalidade, bibliotecarioResponsavel) VALUES (?, ?)", [nacionalidade, bibliotecarioResponsavel],
        (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function removeNacionalidade(idNacionalidade){
    return new Promise((resolve, reject) => {
        mysqlConfig.query('DELETE FROM nacionalidade WHERE idNacionalidade = ?', [idNacionalidade], 
        (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function findNacionalidades(){
    return new Promise((resolve, reject) => {
        mysqlConfig.query("SELECT * FROM nacionalidade", (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

module.exports = {
    addNacionalidade,
    removeNacionalidade,
    findNacionalidades
}