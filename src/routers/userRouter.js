const { Router } = require('express');//constante representando express, {Router} es una desestructuración de la clase Router de express

// la clase que contiene toda la representación de la ruta
 class UserRouter{
     constructor(){
         //creacion de la ruta como atributo de clase
         this.router = Router();// variable router iniciada
         this.config();//llamando el método routes desde el constructor para que se pueda llamar cuando se cree un objeto tipo UserRouter
     }

     //metodo de configuración de rutas
     config(){
         this.router.get('/users', (req, res) => {//los parametros de get son (ruta, funcion que se ejecuta)
            res.status(200).json(
                 [{name:'Fabian', lastname:'Goyeneche'}, 
                 {name:'Ava', lastname:'Addams'}]);      
         });
     }
 }

module.exports = UserRouter;