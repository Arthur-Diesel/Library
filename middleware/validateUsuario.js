const jwt = require('jsonwebtoken')
require('dotenv').config()

var privateKey = process.env.JWT_KEY

function validateUsuario(req, res, next){
    let token = req.headers.jwt
    try {
        var decoded = jwt.verify(token, privateKey)
        if(decoded.cargo == 'Usuário'){
            req.responsavel = decoded.email
            next()
        } else {
            res.status(401).json({mensagem: 'Apenas usuários podem acessar essa rota!'})
        }
    } catch(err) {
        // console.log(err)
        res.status(400).json({mensagem: 'Jwt inválido!'})
    }
}

module.exports = validateUsuario