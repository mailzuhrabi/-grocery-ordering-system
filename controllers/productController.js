// controllers/productController.js
const Product = require('../models/Product');

// =============== CREATE PRODUCT ===============
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const newProduct = new Product({ name, description, price, stock, category });
    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};

// =============== GET ALL PRODUCTS ===============
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};
// =============== UPDATE PRODUCTS ===============
// controllers/productController.js

// =============== UPDATE PRODUCT ===============
const updateProduct = async (req, res) => {
  try {
    const { product_id,  ...updates} = req.body;

    if (!product_id) {
      return res.status(400).json({ message: 'product_id is required' });
    }

    const updated = await Product.findByIdAndUpdate(product_id, updates, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated', product: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// =============== DELETE PRODUCT ===============
const deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({ message: 'product_id is required' });
    }

    const deleted = await Product.findByIdAndDelete(product_id);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully', product: deleted });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct 
};


