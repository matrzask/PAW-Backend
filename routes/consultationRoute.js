const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, consultationController.getConsultation);
router.post('/', protect, consultationController.createConsultation);
router.delete('/:id', protect, consultationController.deleteConsultation);

module.exports = router;