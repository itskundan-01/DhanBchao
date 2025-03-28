const express = require('express');
const router = express.Router();

// Import route files
const authRoutes = require('./api/auth');
const productRoutes = require('./api/products');
const userRoutes = require('./api/users');

// Mount routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);

module.exports = router;
