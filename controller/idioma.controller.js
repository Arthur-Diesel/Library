const idiomaService = require('../service/idioma.service')

function getLanguages(req, res){
    idiomaService.findIdiomas()
        .then((result) => {
            res.status(200).json({idiomas: result})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

module.exports = {
    getLanguages
}