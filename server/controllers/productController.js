const Product = require('../models/Product');
const logger = require('../utils/logger');

// @desc    Get all products with pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Filtering by category and brand
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.brand) filter.brand = req.query.brand;

    // Execute the query
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .select('-description -specifications')
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Pagination result
    const pagination = {
      current: page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    };

    res.status(200).json({
      success: true,
      count: products.length,
      pagination,
      data: products
    });
  } catch (error) {
    logger.error(`Error in getProducts: ${error.message}`);
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    logger.error(`Error in getProduct: ${error.message}`);
    next(error);
  }
};

// @desc    Compare multiple products
// @route   GET /api/products/compare
// @access  Public
const compareProducts = async (req, res, next) => {
  try {
    const productIds = req.query.ids ? req.query.ids.split(',') : [];
    
    if (productIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide product IDs to compare'
      });
    }

    const products = await Product.find({
      _id: { $in: productIds }
    }).select('name image category brand averageRating specifications currentBestPrice priceHistory');

    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    logger.error(`Error in compareProducts: ${error.message}`);
    next(error);
  }
};

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
const searchProducts = async (req, res, next) => {
  try {
    const query = req.query.q || '';
    
    if (!query.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a search query'
      });
    }

    // Full-text search with MongoDB
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' }},
        { brand: { $regex: query, $options: 'i' }},
        { category: { $regex: query, $options: 'i' }}
      ]
    }).select('name image brand category averageRating currentBestPrice');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    logger.error(`Error in searchProducts: ${error.message}`);
    next(error);
  }
};

// @desc    Track price history
// @route   POST /api/products/:id/price
// @access  Private (admin)
const updatePriceData = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    const { store, price, url, inStock } = req.body;

    // Add to price history
    product.priceHistory.push({
      store,
      price,
      url,
      inStock,
      date: Date.now()
    });

    // Update current best price if needed
    if (!product.currentBestPrice || price < product.currentBestPrice.price) {
      product.currentBestPrice = {
        store,
        price,
        url
      };
    }

    await product.save();

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    logger.error(`Error in updatePriceData: ${error.message}`);
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  compareProducts,
  searchProducts,
  updatePriceData
};
