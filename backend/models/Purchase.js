const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  eventDate: {
    type: String,
    trim: true,
  },
  eventTime: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  area: {
    type: String,
    trim: true,
  },
  urlPic: {
    type: String,
    trim: true,
  },
  userEmail: {
    type: String,
    trim: true,
  },
  userName: {
    type: String,
    trim: true,
  },
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
  purchasedAt: {
    type: String,
    trim: true,
  },
  ticketId: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
