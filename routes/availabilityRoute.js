const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');

router.get('/', availabilityController.getAvailability);
router.post('/', availabilityController.createAvailability);

module.exports = router;