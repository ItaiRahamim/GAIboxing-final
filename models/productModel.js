const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: true
    },
    productPrice: {
        type: Number,
        require: true,
        min: 0
    },
    productCategory: {
        type: String,
        lowercase: true
    },
    productImage: {
        type: String,
        require: true
    },
    productSupplier: {
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    size:{
        type: String,
        default: 'One Size'
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
