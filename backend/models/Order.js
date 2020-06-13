const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  order_name: {
    type: String,
    trim: true,
  },
  order_general: {
    type: String,
    trim: true,
  },
  order_vip: {
    type: String,
    trim: true,
  },
  order_total: {
    type: String,
    trim: true,
  },
  order_general_qty: {
    type: Number,
  },
  order_vip_qty: {
    type: Number,
  },
  order_total_tot: {
    type: Number,
  },
  event: {
    type: mongoose.Schema.ObjectId,
    ref: 'Event',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
