const mongoose = require('mongoose');
const Order = require('./orderModel.js');

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        require: true
    },
    customerUsername:{
        type: String,
        require: true
    },
    customerPassword:{
        type: String,
        require: true
    }

})


const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;