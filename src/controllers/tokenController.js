const jwt = require('jsonwebtoken');

class TokenController {

    verifyAuth = (req, res, next) =>{
        //Obtener token
        let token = this.getToken(req);
        // verificar token
        jwt.verify(token, process.env.NODE_PRIVATE_KEY, (error, decode)=> {
            error ? res.status(401).json({info: 'Usuario no autenticado'}) : next()
        });

    }

    //Properties Initializer
    getToken = (req) =>{
        let token = null;
        ///Capturar el barer token de la cabecera
        let authorization = req.headers.authorization;
        if (authorization != null && authorization != undefined) {
            //Realizar split para eliminar los espacios (crea arreglo)
             token = authorization.split(" ")[1];// token es la posicion 1, la 0 es Bearer
        }
        return token;

    }
}

module.exports = TokenController;