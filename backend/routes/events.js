const express = require('express');
const {
  getEvents,
  getEvent,
  createEvents,
  updateEvents,
  deleteEvents,
} = require('../controllers/events');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Get all event items and create event items
router
  .route('/')
  .get(getEvents)
  .post(protect, authorize('admin'), createEvents);

// Get single event item, update and delete event items
router
  .route('/:id')
  .get(getEvent)
  .put(protect, authorize('admin'), updateEvents)
  .delete(protect, authorize('admin'), deleteEvents);

module.exports = router;
