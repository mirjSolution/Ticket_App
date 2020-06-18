const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Purchase = require('../models/Purchase');

// @desc    Get all purchases
// @route   GET /api/v1/purchases
// @access  Public
exports.getPurchases = asyncHandler(async (req, res, next) => {
  const purchases = await Purchase.find().sort('-createdAt');

  res
    .status(200)
    .json({ success: true, count: purchases.length, data: purchases });
});

// @desc    Delete purchases
// @route   DELETE /api/v1/purchases/:id
// @access  Private
exports.deletePurchases = asyncHandler(async (req, res, next) => {
  const purchases = await Purchase.findByIdAndDelete(req.params.id);
  if (!purchases) {
    return next(
      new ErrorResponse(`Purchases not found with id of ${req.params.id}`, 404)
    );
  }

  const purchase1 = await Purchase.find().sort('-createdAt');

  res.status(200).json({ success: true, data: purchase1 });
});
