const generoService = require('../service/genero.service')

function getGenders(req, res){
    generoService.findGeneros()
        .then((result) => {
            res.status(200).json({generos: result})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

module.exports = {
    getGenders
}