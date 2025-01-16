const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/', doctorController.getDoctors);
router.get('/:id', doctorController.getDoctorById);
router.get('/user/:id', doctorController.getDoctorByUserId);
//router.post('/', doctorController.createDoctor);

module.exports = router;