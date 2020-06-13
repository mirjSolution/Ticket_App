const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Order = require('../models/Order');
const Event = require('../models/Event');

// @desc    Get order by user
// @route   GET /api/v1/orders/:id
// @access  Public
exports.getOrder = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({
    user: req.params.id,
  });

  if (!orders) {
    return next(
      new ErrorResponse(`Ticket not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: orders });
});

// @desc       Add order
// @route       POST /api/v1/order
// @access      Private
exports.addOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.create(req.body);
  let event = await Event.findById(req.body.event);

  if (event) {
    event = await Event.findByIdAndUpdate(
      {
        _id: req.body.event,
      },
      { genQty: req.body.ga_tickets_left - req.body.order_general_qty }
    );

    event = await Event.findByIdAndUpdate(
      {
        _id: req.body.event,
      },
      { vipQty: req.body.vip_tickets_left - req.body.order_vip_qty }
    );
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

// @desc    Delete orders
// @route   DELETE /api/v1/orders/:id
// @access  Private
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    return next(
      new ErrorResponse(`Ticket not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});