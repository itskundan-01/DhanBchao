const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
// Import controller functions - uncomment these lines
const { 
  updateProfile, 
  updatePassword,
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist
} = require('../../controllers/userController');
const { protect } = require('../../middleware/auth');

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail()
], protect, updateProfile);

// @route   PUT /api/users/password
// @desc    Update password
// @access  Private
router.put('/password', [
  check('currentPassword', 'Current password is required').exists(),
  check('newPassword', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], protect, updatePassword);

// @route   GET /api/users/watchlist
// @desc    Get user's watchlist
// @access  Private
router.get('/watchlist', protect, getWatchlist);

// @route   POST /api/users/watchlist
// @desc    Add product to watchlist
// @access  Private
router.post('/watchlist', [
  check('productId', 'Product ID is required').not().isEmpty()
], protect, addToWatchlist);

// @route   DELETE /api/users/watchlist/:id
// @desc    Remove product from watchlist
// @access  Private
router.delete('/watchlist/:id', protect, removeFromWatchlist);

// Add other routes here for history and notifications, connecting them to their controller functions

module.exports = router;
