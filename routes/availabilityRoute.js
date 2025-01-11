const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, availabilityController.getAvailability);
router.post('/', protect, availabilityController.createAvailability);

module.exports = router;