const mongoose = require('mongoose');
const Product = require('./productModel');

const orderSchema = new mongoose.Schema({
    orderCustomer: {
        type: String,
        require: true
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    productsList: {
        type: [Product.schema]
    },
    orderQuantity: {
        type: Number,
        require: true,
        min: 0
    },
    orderTotal: {
        type: Number
    }
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;