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
        let {name, price, url_img} = req.body;// del cuerpo se capturan los datos de la petición
        //Obtener token
        let token = this.tokenC.getToken(req);
        //Decodificar token
        let decode = jwt.decode(token, process.env.NODE_PRIVATE_KEY);//acá es cuando necesito jsonwebtoken
       //Obtener la id del usuario a partir del token
       let user_id = decode.id;
       //Crear prosucto en la db
       
       Product.create({name, price, url_img, user_id}, (error, doc) => {// este create es una propiedad del tipo de objeto producto (un tipo Schema)
        
        error ? res.status(500).json({error}) : res.status(201).json(doc)

       });
    }

    getByUser = (req, res) => {
       
        let token = this.tokenC.getToken(req);
        let decode = jwt.decode(token, process.env.NODE_PRIVATE_KEY);
        let user_id = decode.id;
        Product.find({user_id}, (error, doc) => {
            error ? res.status(500).json({error}) : res.status(200).json(doc)
        })
    }

    get = (req, res) => {
        Product.find((error, docs)=>{
         error ? res.status(500).json({error}) : res.status(200).json({docs});   
        })
    }

    update =(req, res) => {
        //Obtener datos del producto para su posterior actuaización
        let {id, name, price, url_img} = req.body;
        let token = this.tokenC.getToken(req);
        let decode = jwt.decode(token, process.env.NODE_PRIVATE_KEY);
        let user_id = decode.id;
        //Actualizar producto por usuario en la base de datos
        /***
         * Primer parámetro ( {_id: id, user_id} ): objeto con las opciones de búsqueda en la BD
         * Segundo parámetro: ( {name, price} ): Campos/valores a actualizar en el documento
         * Tercer parámetro ( (error, doc)=>{} ): callback, función a ejecutarse cuando se envia la petición
         * *****/
        Product.findOneAndUpdate({_id: id, user_id}, {name, price, url_img}, (error, doc)=>{
            error ? res.status(500).json({error}) : res.status(200).json({info: 'Producto actualizado'});
        });
    }

}

module.exports = ProductController;