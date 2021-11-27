const { Router} = require('express');
const ProductController = require('../controllers/productController');
const TokenController = require('../controllers/tokenController');

class ProductRouter {

    constructor () {
        this.router = Router();
        this.config();
 
    }

    config() {
        //Crear el objeto ProductController
        let productC = new ProductController;
        this.router.get('/product', productC.get);// ruta antes del Middleware, por lo tanto es pública

        //Crerar objeto ProductController
        const tokenC = new TokenController;
        //Middlewar
        this.router.use(tokenC.verifyAuth);// verifica si el usuario esta o no autenticado
        
        
        
        
        //Configurar/Crear rutas
        this.router.post('/product', productC.create); // create sin las () porque solo se referencia
        this.router.get('/product/user', productC.getByUser);
        this.router.put('/product', productC.update);
        this.router.delete('/product', productC.delete);
    }
}

module.exports = ProductRouter;