const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');

router.get('/', consultationController.getConsultation);
router.post('/', consultationController.createConsultation);
router.delete('/:id', consultationController.deleteConsultation);

module.exports = router;