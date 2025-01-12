const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', consultationController.getConsultation);
router.post('/', consultationController.createConsultation);
router.delete('/:id', protect, authorize('Doctor'), consultationController.deleteConsultation);

module.exports = router;