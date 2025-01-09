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
        const consultation = await Consultation.findByIdAndDelete(req.params.id);
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