const { Schema , model} = require('mongoose');

const productSchema = Schema({
    name:{
        type: String
    },
    price: {
        type: Number
    },
    url_img: {
        type: String
    },
    user_id: {//se añade automaticamente con el _id del objeto json q se almacena en db
        type: String
    }
}, {
    collection: 'products'
});

module.exports = model('Product', productSchema);