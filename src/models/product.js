const {Schema , model} = require('mongoose');

const productSchema = Schema({
    name:{
        type: String
    },
    price: {
        type: Number
    }
}, {
    collection = 'product'
});

module,exports = model('Product', productSchema);