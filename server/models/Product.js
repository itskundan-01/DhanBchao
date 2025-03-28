const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [200, 'Name cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Electronics',
      'Clothing',
      'Home & Kitchen',
      'Books',
      'Toys',
      'Beauty',
      'Sports',
      'Automotive',
      'Other'
    ]
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand']
  },
  image: {
    type: String,
    default: 'no-image.jpg'
  },
  additionalImages: [String],
  specifications: {
    type: Map,
    of: String
  },
  priceHistory: [{
    store: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    url: String,
    inStock: {
      type: Boolean,
      default: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  currentBestPrice: {
    store: String,
    price: Number,
    url: String
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for reviews
ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});

// Static method to update average product rating
ProductSchema.statics.updateAverageRating = async function(productId) {
  const obj = await this.model('Review').aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);

  try {
    if (obj.length > 0) {
      await this.findByIdAndUpdate(productId, {
        averageRating: obj[0].averageRating.toFixed(1),
        numReviews: obj[0].numReviews
      });
    } else {
      await this.findByIdAndUpdate(productId, {
        averageRating: 0,
        numReviews: 0
      });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongoose.model('Product', ProductSchema);
