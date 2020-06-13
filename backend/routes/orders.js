const express = require('express');
const { addOrder, getOrder, deleteOrder } = require('../controllers/orders');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Add order
router.route('/').post(protect, authorize('admin', 'user'), addOrder);

// Get orders of user
router
  .route('/:id')
  .get(protect, authorize('admin', 'user'), getOrder)
  .delete(protect, authorize('admin', 'user'), deleteOrder);

module.exports = router;
