const Absence = require('../models/absenceModel');
const Doctor = require('../models/doctorModel');
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
        const { doctorId } = req.body;
        const doctor = await Doctor.findOne({ userId: req.user._id });

        if (doctorId !== doctor._id.toString()) {
            return res.status(403).json({
                status: 'fail',
                message: 'You can only add absences for yourself'
            });
        }

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