const User = require('../models/user');
const jwt = require('jsonwebtoken');

class UserController {

    register(req, res) {

        let objUser = req.body;
        if (objUser.name && objUser.lastname && objUser.email && objUser.password) {

            User.create(objUser, (error, doc) => {//create recibe dos parámetros, 1: el objeto que se quiere indertar en la db y 2; función a ejecutar(callback) al crear
                if (error) {
                    res.status(500).json({ info: 'Error de inserción' })
                } else {
                    console.log(doc);
                    let token = jwt.sign(`${doc._id}`, process.env.NODE_PRIVATE_KEY);//el primer parámetro es el payload y el segundo es la clave secreta. `${doc._id}`CON ESTO doc._id TAMBIÉN SE CONVIERT EN string
                    res.status(201).json({ token });
                }
            });
        } else {
            res.status(400).json({ info: 'Datos incompletos' });
        }
    }

    login(req, res) {
        let { email, password } = req.body;//capturando usuario y contraseña del cuerpo de la petición POST en una desestructuración
        //verificando que las credenciales correspondan con las de la db
        User.find({ email, password }, (error, docs) => {
            if (error) {
                console.log(error);
                res.status(500).send();
            } else {
               // si el array es mayor a cero, las credenciales corresponden
                if (docs.length > 0) {
                     //Generar token
                    let token = jwt.sign(`${docs[0]._id}`, process.env.NODE_PRIVATE_KEY);
                    res.status(200).json({ token });
                }else{
                    res.status(401).json({info: 'Credenciales inválidas'});
                }
            }
        })

    }

    /*update(req, res){
      
        /*console.log("----------------------Bearer token-----------------");
        console.log(arrayAuth[1]);
        console.log("---------------------------------------------------")*/
       /* jwt.verify(token, process.env.NODE_PRIVATE_KEY, (error, decode)=>{//arrow function recibe como parámetros el error y el decode; la decodificación
            console.log("Decode:");
            console.log(decode);// el decode es el id del objeto en la db

        })
        res.status(200).json({info: 'Datos actualizados'});
    }*/
}
module.exports = UserController;