const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// =================== VIEW CART ===================
const viewCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user.userId });
    if (!cart) return res.json({ cart: [], total: 0 });

    const items = await CartItem.find({ cart_id: cart._id }).populate('product_id');

    let total = 0;

    const cartItems = items
      .filter(item => item.product_id) // Only include items with valid product
      .map(item => {
        const price = item.product_id.price;
        const subtotal = price * item.quantity;
        total += subtotal;

        return {
          item_id: item._id,
          product: item.product_id.name,
          price,
          quantity: item.quantity,
          subtotal
        };
      });

    res.status(200).json({ cart: cartItems, total });
  } catch (err) {
    res.status(500).json({ message: "Failed to load cart", error: err.message });
  }
};

// =================== ADD TO CART ===================
const addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    if (!product_id || typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).json({ message: "Valid product_id and positive quantity required" });
    }

    const userId = req.user.userId;

    let cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      cart = await Cart.create({ user_id: userId });
    }

    let existing = await CartItem.findOne({ cart_id: cart._id, product_id });
    if (existing) {
      existing.quantity += quantity;
      await existing.save();
    } else {
      await CartItem.create({ cart_id: cart._id, product_id, quantity });
    }

    res.status(200).json({ message: "Item added to cart" });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Failed to add to cart", error: err.message });
  }
};

// =================== UPDATE CART ===================
const updateCartItem = async (req, res) => {
  try {
    const { item_id, quantity } = req.body;

    console.log("🔍 item_id:", item_id);
    console.log("🔍 quantity:", quantity);

    if (!item_id || typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).json({ message: 'Valid item_id and positive quantity are required' });
    }

    const updatedItem = await CartItem.findByIdAndUpdate(
      item_id,
      { quantity },
      { new: true }
    );

    if (!updatedItem) {
      console.log("❌ No cart item found for ID:", item_id);
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Quantity updated successfully', item: updatedItem });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update cart item', error: err.message });
  }
};

// =================== REMOVE CART ===================
const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOneAndDelete({ user_id: userId });
    if (cart) {
      await CartItem.deleteMany({ cart_id: cart._id }); // Delete all items linked to cart
    }

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete cart", error: err.message });
  }
};

module.exports = {
  viewCart,
  addToCart,
  updateCartItem,
  removeCartItem
};
