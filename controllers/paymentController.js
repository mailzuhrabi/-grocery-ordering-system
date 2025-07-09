const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

const makePayment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { paymentMethod } = req.body; // e.g., 'online' or 'COD'

    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) return res.status(400).json({ message: "Cart not found" });

    const items = await CartItem.find({ cart_id: cart._id }).populate('product_id');
    if (!items.length) return res.status(400).json({ message: "Cart is empty" });

    let totalAmount = 0;

    const orderItems = [];
    for (const item of items) {
      if (item.product_id) {
        const subtotal = item.product_id.price * item.quantity;
        totalAmount += subtotal;

        orderItems.push({
          product_id: item.product_id._id,
          quantity: item.quantity,
          price: item.product_id.price
        });
      }
    }

    // ✅ Create order
    const order = new Order({
      user_id: userId,
      total_amount: totalAmount,
      status: 'processing',
      payment_status: 'paid',
      payment_method: paymentMethod || 'online'
    });

    await order.save();

    // ✅ Save order items
    for (const item of orderItems) {
      await OrderItem.create({
        order_id: order._id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      });
    }

    // ✅ Clear cart
    await CartItem.deleteMany({ cart_id: cart._id });
    await Cart.findByIdAndDelete(cart._id);

    res.status(200).json({ message: "Payment successful and order placed", order });
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ message: "Payment failed", error: err.message });
  }
};

module.exports = {
  makePayment
};
