const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    supplierName: {
        type: String,
        require: true
    }
})

const Supplier = mongoose.model('suppliers', supplierSchema);
module.exports = Supplier;