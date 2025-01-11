const express = require('express');
const router = express.Router();
const absenceController = require('../controllers/absenceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, absenceController.getAbsence);
router.post('/', protect, absenceController.createAbsence);

module.exports = router;