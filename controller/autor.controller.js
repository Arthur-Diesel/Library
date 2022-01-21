const autorService = require('../service/autor.service')

function getAuthors(req, res){
    autorService.findAutores()
        .then((result) => {
            res.status(200).json({autores: result})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

module.exports = {
    getAuthors
}