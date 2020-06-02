const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventDate: {
    type: String,
    required: [true, 'Please add date'],
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add name'],
    maxlength: [50, 'Name Can not be more than 50 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description Can not be more than 500 characters'],
  },
  area: {
    type: String,
    trim: true,
    required: [true, 'Please add Area/Location'],
    maxlength: [100, 'Area/Location Can not be more than 100 characters'],
  },
  general: {
    type: Number,
  },
  genQty: {
    type: Number,
  },
  vip: {
    type: Number,
    quantity: Number,
  },
  vipQty: {
    type: Number,
  },
  reserved: {
    type: Number,
  },
  resQty: {
    type: Number,
  },
  earlybird: {
    type: Number,
  },
  earlyQty: {
    type: Number,
  },

  urlPic: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', EventSchema);
