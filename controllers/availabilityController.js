const Availability = require('../models/availabilityModel');
const Doctor = require('../models/doctorModel');
const mongoose = require('mongoose');

exports.getAvailability = async (req, res) => {
    try {
        const doctorId = req.query.doctorId;
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(200).json([]);
        }
        const availability = await Availability.find({ doctorId: doctorId });
        res.status(200).json(availability);
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.createAvailability = async (req, res) => {
    try {
        const { doctorId } = req.body;
        const doctor = await Doctor.findOne({ userId: req.user._id });

        if (doctorId !== doctor._id.toString()) {
            return res.status(403).json({
                status: 'fail',
                message: 'You can only add availability for yourself'
            });
        }

        const newAvailability = await Availability.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                availability: newAvailability
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};