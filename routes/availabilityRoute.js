const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', availabilityController.getAvailability);
router.post('/', protect, authorize('Doctor'), availabilityController.createAvailability);

module.exports = router;