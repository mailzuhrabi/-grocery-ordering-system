const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');

// ========================
// ✅ Create Order
const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Step 1: Find cart
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Step 2: Find cart items
    const cartItems = await CartItem.find({ cart_id: cart._id }).populate('product_id');
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Step 3: Calculate total
    let totalAmount = 0;
    for (const item of cartItems) {
      if (!item.product_id || typeof item.product_id.price !== 'number') {
        throw new Error("Product price not found for item: " + item._id);
      }
      totalAmount += item.product_id.price * item.quantity;
    }

    // Step 4: Create new order
    const newOrder = new Order({
      user_id: userId,
      total_amount: totalAmount,
      status: 'processing',
      payment_status: 'paid'
    });

    await newOrder.save(); // Save order to get _id

    // Step 5: Create Order Items
    for (const item of cartItems) {
      await OrderItem.create({
        order_id: newOrder._id,
        product_id: item.product_id._id,
        quantity: item.quantity,
        price: item.product_id.price
      });
    }

    // ✅ Step 6: Clear user's cart items and cart document
    await CartItem.deleteMany({ cart_id: cart._id });
    await Cart.findByIdAndDelete(cart._id);  // 🟢 This line was missing

    res.status(200).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({
      message: 'Order placement failed',
      error: error.message
    });
  }
};

// ========================
// ✅ Get All Orders for Logged-in User
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.userId }).sort({ order_date: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// ========================
// ✅ Get Order Details by Order ID (formatted)
const getOrderDetails = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.userId }).sort({ order_date: -1 });

    const formattedOrders = orders.map(order => ({
      orderId: order._id,
      totalAmount: order.total_amount,
      status: order.status,
      paymentStatus: order.payment_status,
      orderDate: order.order_date.toLocaleString() // You can replace this with moment.js if needed
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderDetails
};
