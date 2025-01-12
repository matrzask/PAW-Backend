const express = require('express');
const router = express.Router();
const absenceController = require('../controllers/absenceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, absenceController.getAbsence);
router.post('/', protect, authorize('Doctor'), absenceController.createAbsence);

module.exports = router;