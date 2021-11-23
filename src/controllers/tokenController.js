const jwt = require('jsonwebtoken');

class TokenController {
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