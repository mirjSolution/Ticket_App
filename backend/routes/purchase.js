const express = require('express');
const { getPurchases, deletePurchases } = require('../controllers/purchase');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Get all purchases
router.route('/').get(protect, authorize('admin'), getPurchases);

// Delete orders of user
router.route('/:id').delete(protect, authorize('admin'), deletePurchases);

module.exports = router;
