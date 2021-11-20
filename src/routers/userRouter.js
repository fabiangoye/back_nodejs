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

         this.router.post('/users', (req, res) =>{// un post recibe datos el servidor, el usuario envía datos
            let {name, lastname, email} = req.body;// desestructuración {}
            console.log("name: ", name);
            console.table(req.body);
            res.status(201).json({message: 'user created'}); //respuesta al cliente, acá finaliza el proceso, el response es como el return de una función
         })
     }
 }

module.exports = UserRouter;