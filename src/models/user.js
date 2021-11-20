const { Schema, model } = require('mongoose');

const userSchema = Schema({// recibe dos objetos como parametros..
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
},//1ro el modelo de datos
 {
    collection: 'users'
});// y 2do, la colección a la cual pertenece

module.exports = model('User', userSchema);// este model() se importa arriba en el require. recibe dos parametros, 1ro el modelo y 2do el Schema al que pertenece ese modelo