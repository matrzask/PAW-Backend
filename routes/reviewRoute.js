const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/authMiddleware');
const checkBanned = require('../middleware/checkBanned');

router.get('/', reviewController.getReviews);
router.post('/', protect, authorize('Patient'), checkBanned, reviewController.addReview);

module.exports = router;