const express = require('express');
const {
  getPurchases,
  deletePurchases,
  getTicket,
  updatePurchase,
} = require('../controllers/purchase');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Get all purchases
router.route('/').get(protect, authorize('admin'), getPurchases);

// Delete orders of user and update user order
router.route('/:id').delete(protect, authorize('admin'), deletePurchases);

// Get ticket

router.route('/:ticketId').get(getTicket).put(updatePurchase);
module.exports = router;
