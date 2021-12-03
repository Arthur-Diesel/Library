const mysqlConfig = require('../db/config')

function registerUser(nome, email, senha){
    return new Promise((resolve, reject) =>{
            mysqlConfig.query(`INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`, 
            (err, result, fields) => {
                if(err){
                    return reject(err)
                } else {
                    return resolve(result)
                }
        })
    })
}

function findUserWithPassword(email, senha){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`SELECT idUsuario FROM usuario WHERE email = '${email}' AND senha = '${senha}'`, 
        (err, result, fields) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result) 
            }
        })
    })
}

function findUser(email){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`SELECT idUsuario FROM usuario WHERE email = ?`, [email],
        (err, result, fields) => {
            if (err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function addDivida(idUsuario){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`UPDATE usuario SET divida = divida + 2 WHERE idUsuario = ?`, [idUsuario],
        (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

module.exports = {
    registerUser,
    findUser,
    findUserWithPassword,
    addDivida
}