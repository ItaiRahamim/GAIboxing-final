const express = require('express');
const router = express.Router();
const Customer = require('../models/customerModel');

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get customer by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: `Cannot find any customer with ID ${id}` });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update a customer
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndUpdate(id, req.body);
    if (!customer) {
      return res.status(404).json({ message: `Cannot find any customer with ID ${id}` });
    }
    const updatedCustomer = await Customer.findById(id);
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a customer
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return res.status(404).json({ message: `Cannot find any customer with ID ${id}` });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
    const { customerUsername, customerPassword } = req.body;
  
    try {
      // Find the customer by username
      const customer = await Customer.findOne({ customerUsername });
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      // Compare the provided password with the stored password
      if (customer.customerPassword !== customerPassword) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


// Register route
router.post('/register', async (req, res) => {
    const { customerName, customerUsername, customerPassword } = req.body;
  
    try {
      // Check if the username is already taken
      const existingCustomer = await Customer.findOne({ customerUsername });
      if (existingCustomer) {
        return res.status(409).json({ message: 'Username is already taken' });
      }
  
      // Create a new customer
      const newCustomer = new Customer({
        customerName,
        customerUsername,
        customerPassword
      });
      await newCustomer.save();
  
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Logout route
  router.post('/logout', async (req, res) => {
    // Perform any necessary logout logic
    res.status(200).json({ message: 'Logout successful' });
  });
  
  module.exports = router;

module.exports = router;