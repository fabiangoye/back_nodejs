const mongoose = require('mongoose');
const { db } = require('./urlDb.js');

class ConnDb {
    constructor(){
      this.connection();
        
    }
    async connection(){
        this.conn = await mongoose.connect(db); // await por que es asíncrono. connect recibe 1: url de la db, 2: opciones. el await es para q espere y no se salte
        /*mongoose.connect(db).then(() =>{
            console.log('conexion exitosa a db');
        });*/
    }

}

module.exports = ConnDb;