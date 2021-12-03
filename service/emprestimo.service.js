const mysqlConfig = require('../db/config')

function newEmprestimo(idUsuario, idLivro, dataEmprestimo, dataDevolucao){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`INSERT INTO emprestimo (idUsuario, idLivro, dataEmprestimo, dataDevolucao) VALUES (?, ?, ?, ?)`, [idUsuario, idLivro, dataEmprestimo, dataDevolucao],
        (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}


function findStatusEmprestimoLivro(idLivro){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`SELECT statusEmprestimo FROM emprestimo WHERE idLivro = ?`, [idLivro],
        (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })

}

function findEmprestimoEmAndamentoOrPendente(idUsuario){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`SELECT idEmprestimo FROM emprestimo WHERE statusEmprestimo = 'Pendente' OR statusEmprestimo = 'Em Andamento' AND idUsuario = ?`,[idUsuario],
        (err,result,fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function findStatusEmprestimoUsuario(idEmprestimo, idUsuario){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`SELECT statusEmprestimo FROM emprestimo WHERE idEmprestimo = ? AND idUsuario = ?`, [idEmprestimo,idUsuario], 
        (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}


function newDevolucao(idUsuario,idEmprestimo){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`UPDATE emprestimo SET statusEmprestimo = 'Encerrado' WHERE idEmprestimo = ? AND idUsuario = ?`, [idEmprestimo, idUsuario],
        (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })   
    })
}

function findEmprestimos(idUsuario){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`SELECT idEmprestimo, idLivro, dataEmprestimo, dataDevolucao, statusEmprestimo FROM emprestimo WHERE idUsuario = ?`, [idUsuario],
        (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function alterStatusPendenteService(dataHoje){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`UPDATE emprestimo SET statusEmprestimo = 'Pendente' WHERE dataDevolucao < Convert(datetime, ?)`, [dataHoje],
        (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function getUsuariosPendentes(){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`SELECT idUsuario FROM emprestimo WHERE statusEmprestimo = 'Pendente'`,
        (err, result, fields) => {
            if(err){
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}

function findBook(idEmprestimo){
    return new Promise((resolve, reject) => {
        mysqlConfig.query(`SELECT idLivro FROM emprestimo WHERE idEmprestimo = ?`, [idEmprestimo],
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
    newEmprestimo, 
    newDevolucao,
    findEmprestimoEmAndamentoOrPendente,
    findStatusEmprestimoLivro,
    findStatusEmprestimoUsuario,
    findEmprestimos,
    alterStatusPendenteService,
    getUsuariosPendentes,
    findBook
}