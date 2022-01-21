const mysqlConfig = require('../db/config')

function addIdioma(idioma, bibliotecarioResponsavel ){
    return new Promise((resolve, reject) => {
        mysqlConfig.query("INSERT INTO idioma (idioma, bibliotecarioResponsavel) VALUES (?, ?)", [idioma, bibliotecarioResponsavel], (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function removeIdioma(idIdioma){
    return new Promise((resolve, reject) => {
        mysqlConfig.query("DELETE FROM idioma WHERE idIdioma = ?", [idIdioma], (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function findIdiomas(){
    return new Promise((resolve, reject) => {
        mysqlConfig.query("SELECT * FROM idioma", (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

module.exports = {
    addIdioma,
    removeIdioma,
    findIdiomas
}