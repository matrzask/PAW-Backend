const express = require('express');
const router = express.Router();
const absenceController = require('../controllers/absenceController');

router.get('/', absenceController.getAbsence);
router.post('/', absenceController.createAbsence);

module.exports = router;