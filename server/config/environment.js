require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/dhanbchao',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  // API keys for e-commerce platforms
  AMAZON_API_KEY: process.env.AMAZON_API_KEY,
  FLIPKART_API_KEY: process.env.FLIPKART_API_KEY,
  // Email configuration
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};
