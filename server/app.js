const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const database = require('./config/database');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

// Initialize app
const app = express();

// Connect to database
(async () => {
  try {
    const connected = await database.connect();
    if (connected) {
      logger.info('Database connection established successfully');
    } else {
      logger.error('Failed to establish database connection');
    }
  } catch (error) {
    logger.error('Database connection error:', error.message);
  }
})();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Database connection check middleware
app.use((req, res, next) => {
  if (req.path !== '/api/health' && req.path !== '/') {
    database.checkConnection().then(isConnected => {
      if (!isConnected) {
        logger.warn(`Database not connected for request: ${req.method} ${req.path}`);
        return res.status(503).json({ 
          success: false, 
          error: 'Database connection unavailable' 
        });
      }
      next();
    }).catch(err => {
      logger.error('Error checking database connection:', err);
      next();
    });
  } else {
    next();
  }
});

// Routes
app.use('/api', routes);

// Health check route
app.get('/api/health', async (req, res) => {
  const dbConnected = await database.checkConnection();
  
  res.json({ 
    status: 'ok', 
    environment: process.env.NODE_ENV,
    database: dbConnected ? 'connected' : 'disconnected'
  });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MahaLoot API' });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
