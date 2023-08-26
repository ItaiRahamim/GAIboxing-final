const express = require('express');
const mongoose = require('mongoose');
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');
const customerController = require('./controllers/customerController');
const supplierController = require('./controllers/supplierController');
const cors = require('cors');

const app = express();
const PORT = 3000;


mongoose.connect('mongodb+srv://itairahamim1:Itai2311@cluster0.mwnmbd9.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productController);
app.use('/api/orders', orderController);
app.use('/api/customers', customerController);
app.use('/api/suppliers', supplierController);

app.get('/', (req, res) => {
  res.send('Successful response.');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});