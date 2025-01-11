const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, doctorController.getDoctors);
router.get('/:id', protect, doctorController.getDoctorById);
router.post('/', protect, doctorController.createDoctor);

module.exports = router;