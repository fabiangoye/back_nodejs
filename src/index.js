const express = require('express'); // importando express
/***configurando express***/
const morgan = require('morgan');
const UserRouter = require('./routers/userRouter');//relacionando ruta UserRouter 
const ConnDb = require('./database/connDb');



class Server {// representa al servidor, hace referencia
    constructor(){
        this.connDb = new ConnDb();// creando objeto tipo ConnDb
        this.app = express(); //creando aplicación express como atributo de clase
        this.config();
       
    }

    config(){
         //indicar que se procesarán datos en formatop json en las peticiones a recibir
         this.app.use(express.json());

         // indicar el uso de morgan para el monitoreo de las peticiones http
         this.app.use(morgan());
 
         //configurar/almacenar el puerto por el que correrá el servidor
         this.app.set('PORT', process.env.PORT || 3000); // si existe la variable de entorno PORT se usa esta, si no se usa el 3000
 
 
 
         //------------------------------------------crear la ruta/end point (api) raíz------------------------------------------
         let router = express.Router();
         router.get('/', (req, res) => {//reciben dos parámetros, la ruta, ruta raiz en este caso, y el método (o función, flecha en este cado con parámetros req y res) que se ejecuta al recibir una petición http
 
             res.status(200).json({message: 'All ok'});//send es para enviar el status
 
         }); 
         let userR = new UserRouter();//con () acá se esta llamado al método constructor de la clase UserRouter 
 
 
         //------------------------------------------añadir ruta a express------------------------------------------
         this.app.use(router);
         this.app.use(userR.router);// se coloca userR.router y no userR.config por que el index.js necesita el objeto router
 
         //levantar/poner a la escucha al servidor
         this.app.listen(this.app.get('PORT'), ()=>{// listen recibe dos parámetros, el puerto y una función, que es opciona, y que se ejecuta al momento de levantar el servidor
 
             console.log("servidor corriendo por el puerto ===> ", this.app.get('PORT'));
         });
    }
}

new Server();