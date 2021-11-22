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
                    res.status(201).json({token});
                }
            });
        } else {
            res.status(400).json({info: 'Datos incompletos'});
        }
    }
}
module.exports = UserController;