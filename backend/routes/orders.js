const express = require('express');
const { addOrder, getOrder, deleteOrder } = require('../controllers/orders');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Add order
router.route('/').post(protect, authorize('admin', 'user'), addOrder);

// Get orders of user
router.route('/:userId').get(protect, authorize('admin', 'user'), getOrder);

// Delete orders of user
router
  .route('/:userId/:orderId')
  .delete(protect, authorize('admin', 'user'), deleteOrder);

module.exports = router;
