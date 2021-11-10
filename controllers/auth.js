const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next){
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        // Para obtener el ID del user con el Token:
        // console.log(jwt.decode(token)._id);
        jwt.verify(token, process.env.SECRET_TOKEN);
        next();
    } catch (error) {
        res.status(401).send({error: error.message});
    }
}

module.exports = auth;