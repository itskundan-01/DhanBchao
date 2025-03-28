const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
// Import controller functions - uncomment these lines
const { register, login, getMe, logout } = require('../../controllers/authController');
const { protect } = require('../../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], register); // Use the register controller function

// @route   POST /api/auth/login
// @desc    Login user & get token
// @access  Public
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], login); // Use the login controller function

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, getMe); // Use the getMe controller function and protect middleware

// @route   POST /api/auth/logout
// @desc    Logout user / clear cookie
// @access  Private
router.post('/logout', protect, logout); // Use the logout controller function and protect middleware

module.exports = router;
