// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  method: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'cod'],
    default: 'cod'
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },
  transaction_id: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
