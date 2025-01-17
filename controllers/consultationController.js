const Consultation = require('../models/consultationModel');
const mongoose = require('mongoose');

exports.getConsultation = async (req, res) => {
    try {
        const doctorId = req.query.doctorId;
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(200).json([]);
        }
        const consultation = await Consultation.find({ doctorId: doctorId });
        res.status(200).json(consultation);
    } catch (err) {
        res.status(400).json([{
            status: 'fail',
            message: err.message
        }]);
    }
};

exports.createConsultation = async (req, res) => {
    try {
        const newConsultation = await Consultation.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                consultation: newConsultation
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.deleteConsultation = async (req, res) => {
    try {
        const consultation = await Consultation.findById(req.params.id);

        if (!consultation) {
            return res.status(404).json({
                status: 'fail',
                message: 'Consultation not found'
            });
        }

        if (consultation.doctorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                status: 'fail',
                message: 'You are not authorized to delete this consultation'
            });
        }

        await consultation.remove();
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}