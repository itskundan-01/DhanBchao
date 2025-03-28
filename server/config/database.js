const mongoose = require('mongoose');
const config = require('./environment');
const logger = require('../utils/logger');

// Check database connection
const checkConnection = async () => {
  try {
    const state = mongoose.connection.readyState;
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (state === 1) {
      logger.info('MongoDB connection active');
      return true;
    } else {
      logger.warn(`MongoDB connection not active. Current state: ${state}`);
      return false;
    }
  } catch (error) {
    logger.error('Error checking MongoDB connection:', error.message);
    return false;
  }
};

// Connect to MongoDB
const connect = async () => {
  try {
    // Only attempt connection if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.info('MongoDB connected successfully');
      
      // Set up connection error handlers
      mongoose.connection.on('error', err => {
        logger.error('MongoDB connection error:', err);
      });
      
      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected');
      });
      
      // Handle app termination
      process.on('SIGINT', async () => {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed due to app termination');
        process.exit(0);
      });
      
      return true;
    } else {
      logger.info('MongoDB already connected');
      return true;
    }
  } catch (error) {
    logger.error('MongoDB connection error:', error.message);
    // Exit application on critical DB connection error
    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
    return false;
  }
};

module.exports = { connect, checkConnection };
