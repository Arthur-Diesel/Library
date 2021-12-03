const emprestimoService = require('../service/emprestimo.service')
const userService = require('../service/usuario.service')

function alterStatusPendente(){
    let dateToday = new Date()
    let dataHoje = dateToday.toISOString().split('T')[0]
    emprestimoService.alterStatusPendenteService(dataHoje)
        .then((result) => {
            console.log('Status atualizados!')
        })
        .catch((err) => {
            console.log('Houve um erro na atualização de status!')
            console.log(err)
        })
}

function alterDividaUsuario(){
    emprestimoService.getUsuariosPendentes()
        .then((result) => {
            for(user in result){
                userService.addDivida(user.idUsuario)
            }
        })
        .catch((err) => {
            console.log('Houve um erro na atualização de dívidas!')
            console.log(err)
        })
    
}

module.exports = {
    alterStatusPendente,
    alterDividaUsuario
}