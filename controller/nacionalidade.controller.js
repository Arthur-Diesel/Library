const nacionalidadeService = require('../service/nacionalidade.service')

function getNationalities(req, res){
    nacionalidadeService.findNacionalidades()
        .then((result) => {
            res.status(200).json({nacionalidades: result})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

module.exports = {
    getNationalities
}