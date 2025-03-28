const jwt = require('jsonwebtoken');
const config = require('../config/environment');
const User = require('../models/User');

// Protect routes
const protect = async (req, res, next) => {
  let token;

  // Get token from header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required. Please log in.'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Add user to req object
    const user = await User.findById(decoded.id);
    
    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User account no longer exists.'
      });
    }
    
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Your session has expired. Please log in again.'
      });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid authentication token. Please log in again.'
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};

// Admin only middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
