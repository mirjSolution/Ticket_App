const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventDate: {
    type: String,
    trim: true,
    required: [true, 'Please add date'],
  },
  eventTime: {
    type: String,
    trim: true,
    required: [true, 'Please add time'],
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
    default: 0,
  },
  genQty: {
    type: Number,
    default: 0,
  },
  vip: {
    type: Number,
    default: 0,
  },
  vipQty: {
    type: Number,
    default: 0,
  },
  reserved: {
    type: Number,
    default: 0,
  },
  resQty: {
    type: Number,
    default: 0,
  },
  earlybird: {
    type: Number,
  },
  earlyQty: {
    type: Number,
    default: 0,
  },

  urlPic: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', EventSchema);
