const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Events = require('../models/Event');

// @desc    Get all events
// @route   GET /api/v1/events
// @access  Public
exports.getEvents = asyncHandler(async (req, res, next) => {
  const events = await Events.find().sort('-date');

  res.status(200).json({ success: true, count: events.length, data: events });
});

// @desc    Get single event
// @route   GET /api/v1/events/:id
// @access  Public
exports.getEvent = asyncHandler(async (req, res, next) => {
  const events = await Events.findById(req.params.id);

  if (!events) {
    return next(
      new ErrorResponse(`Items not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: events });
});

// @desc    Create events
// @route   POST /api/v1/events
// @access  Private
exports.createEvents = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.usercreate = req.user.id;

  const events = await Events.create(req.body);
  res.status(201).json({
    success: true,
    data: events,
  });
});

// @desc    Update events
// @route   PUT /api/v1/events/:id
// @access  Private
exports.updateEvents = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.usercreate = req.user.id;

  const events = await Events.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!events) {
    return next(
      new ErrorResponse(`Items not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: events });
});

// @desc    Delete Events
// @route   DELETE /api/v1/events/:id
// @access  Private
exports.deleteEvents = asyncHandler(async (req, res, next) => {
  const events = await Events.findByIdAndDelete(req.params.id);
  if (!events) {
    return next(
      new ErrorResponse(`Events not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
