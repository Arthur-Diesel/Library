const mysqlConfig = require('../db/config')

function addBibliotecario(nome, email, senha){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`INSERT INTO bibliotecario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`, 
        (err, result, fields) => {
            if (err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })        
    })
}

function findBibliotecarioWithEmail(email){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`SELECT idBibliotecario FROM bibliotecario WHERE email = ?`, [email],
        (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function findBibliotecarioWithEmailAndPassword(email, senha){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`SELECT idBibliotecario FROM bibliotecario WHERE email = ? AND senha = ?`, [email, senha],
        (err, result, fields) => {
            if (err){
                return reject(err)
            } else {
                return resolve(result)   
            }
        })
    })
}

module.exports = {
    addBibliotecario, 
    findBibliotecarioWithEmail,
    findBibliotecarioWithEmailAndPassword
}