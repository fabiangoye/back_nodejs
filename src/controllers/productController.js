const TokenController = require("./tokenController");
const jwt = require('jsonwebtoken');
const Product = require('../models/product');

class ProductController{

    constructor(){
        //Crear atributo de la clase de tipo TokenController
        this.tokenC = new TokenController;
    }

    create = (req, res) => {
        //Obtener datos del cuerpo de la petición
        let {name, price} = req.body;// del cuerpo se capturan los datos de la petición
        //Obtener token
        let token = this.tokenC.getToken(req);
        //Decodificar token
        let decode = jwt.decode(token, process.env.NODE_PRIVATE_KEY);//acá es cuando necesito jsonwebtoken
       //Obtener la id del usuario a partir del token
       let user_id = decode.id;
       //Crear prosucto en la db
       
       Product.create({name, price, user_id}, (error, doc) => {// este create es una propiedad del tipo de objeto producto (un tipo Schema)
        
        error ? res.status(500).json({error}) : res.status(201).json(doc)

       });
    }
}

module.exports = ProductController;