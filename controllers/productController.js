const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search products
router.get('/search:value', async (req, res) => {
    try {
      const { value } = req.query;
  
      // Perform the search query using a case-insensitive regular expression
      const searchResults = await Product.find({
        $or: [
          { productName: { $regex: value, $options: 'i' } },
          { productCategory: { $regex: value, $options: 'i' } }
        ]
      });
  
      res.status(200).json(searchResults);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get products by Category
router.get('/category', (req, res) => {
    const { category } = req.query;
    const filteredProducts = products.filter((product) => product.category === category);
    res.json(filteredProducts);
});
// Add a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

//Add multiple products
router.post('/add-multiple', async (req, res) => {
    try {
      const products = req.body; // Assuming the request body contains an arroay of products
      const createdProducts = await Product.create(products);
      res.status(200).json(createdProducts);
    } catch (error) {
      res.status(500).json({ message: 'Error adding products' });
    }
  });

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete all products
router.delete('/', async (req, res) => {
  try {
    const result = await Product.deleteMany({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;