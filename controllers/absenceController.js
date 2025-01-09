const Absence = require('../models/absenceModel');
const mongoose = require('mongoose');

exports.getAbsence = async (req, res) => {
    try {
        const doctorId = req.query.doctorId;
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(200).json([]);
        }
        const absence = await Absence.find({ doctorId: doctorId });
        res.status(200).json(absence);
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.createAbsence = async (req, res) => {
    try {
        const newAbsence = await Absence.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                absence: newAbsence
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};