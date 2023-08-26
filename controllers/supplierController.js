const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplierModel');
const Product = require('../models/productModel');

// Get all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get supplier by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findById(id);
    if (!supplier) {
      return res.status(404).json({ message: `Cannot find any supplier with ID ${id}` });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new supplier
router.post('/', async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: 'Error adding supplier' });
  }
});

//Add multiple suppliers
router.post('/add-multiple', async (req, res) => {
    try {
      const suppliers = req.body; // Assuming the request body contains an arroay of suppliers
      const createdSuppliers = await Supplier.create(suppliers);
      res.status(200).json(createdSuppliers);
    } catch (error) {
      res.status(500).json({ message: 'Error adding suppliers' });
    }
  });

// Update a supplier
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByIdAndUpdate(id, req.body);
    if (!supplier) {
      return res.status(404).json({ message: `Cannot find any supplier with ID ${id}` });
    }
    const updatedSupplier = await Supplier.findById(id);
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a supplier
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByIdAndDelete(id);
    if (!supplier) {
      return res.status(404).json({ message: `Cannot find any supplier with ID ${id}` });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
