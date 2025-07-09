// models/Product.js
// models/productModel.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: String,
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  image_url: String // optional
});

// ✅ Safe model export (fixes OverwriteModelError)
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
