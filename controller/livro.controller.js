const livrosService = require('../service/livros.service')

function getBooks (req, res){
    livrosService.findBooks()
        .then((result) => {
            res.status(200).json({livros: result})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({mensagem: 'Houve um erro no sistema!'})
        })
}

module.exports = {
    getBooks
}