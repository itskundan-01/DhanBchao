const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
const logger = require('../utils/logger');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name, email, preferences } = req.body;
    
    // Check if email is already in use by another user
    if (email !== req.user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          error: 'Email is already in use'
        });
      }
    }
    
    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, 
      { name, email, preferences },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    logger.error(`Error in updateProfile: ${error.message}`);
    next(error);
  }
};

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
const updatePassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const user = await User.findById(req.user.id).select('+password');
    
    // Check current password
    const isMatch = await user.matchPassword(req.body.currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }
    
    // Set new password
    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    logger.error(`Error in updatePassword: ${error.message}`);
    next(error);
  }
};

// @desc    Get user's watchlist
// @route   GET /api/users/watchlist
// @access  Private
const getWatchlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'watchlist',
      select: 'name image currentBestPrice priceHistory'
    });

    res.status(200).json({
      success: true,
      data: user.watchlist
    });
  } catch (error) {
    logger.error(`Error in getWatchlist: ${error.message}`);
    next(error);
  }
};

// @desc    Add product to watchlist
// @route   POST /api/users/watchlist
// @access  Private
const addToWatchlist = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { productId } = req.body;
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    // Check if product is already in watchlist
    const user = await User.findById(req.user.id);
    if (user.watchlist.includes(productId)) {
      return res.status(400).json({
        success: false,
        error: 'Product is already in watchlist'
      });
    }
    
    // Add product to watchlist
    user.watchlist.push(productId);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Product added to watchlist',
      data: {
        id: productId
      }
    });
  } catch (error) {
    logger.error(`Error in addToWatchlist: ${error.message}`);
    next(error);
  }
};

// @desc    Remove product from watchlist
// @route   DELETE /api/users/watchlist/:id
// @access  Private
const removeFromWatchlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Check if product is in watchlist
    if (!user.watchlist.includes(req.params.id)) {
      return res.status(404).json({
        success: false,
        error: 'Product not found in watchlist'
      });
    }
    
    // Remove product from watchlist
    user.watchlist = user.watchlist.filter(
      id => id.toString() !== req.params.id
    );
    
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Product removed from watchlist'
    });
  } catch (error) {
    logger.error(`Error in removeFromWatchlist: ${error.message}`);
    next(error);
  }
};

module.exports = {
  updateProfile,
  updatePassword,
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist
};
