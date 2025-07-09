const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total_amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing'
  },
  order_date: { type: Date, default: Date.now },
  payment_status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  payment_id: { type: String }
});

// ✅ Use this only during dev to avoid OverwriteModelError
delete mongoose.connection.models['Order'];
module.exports = mongoose.model('Order', orderSchema);
