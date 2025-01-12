const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, consultationController.getConsultation);
router.post('/', protect, consultationController.createConsultation);
router.delete('/:id', protect, authorize('Doctor'), consultationController.deleteConsultation);

module.exports = router;