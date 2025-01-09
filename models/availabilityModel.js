const mongoose = require('mongoose');

const TimeSchema = new mongoose.Schema({
    start: { type: String, required: true },
    end: { type: String, required: true }
});

const AvailabilitySchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    oneTime: { type: Boolean, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    daysOfWeek: { type: [String], required: true },
    times: { type: [TimeSchema], required: true }
});

module.exports = mongoose.model('Availability', AvailabilitySchema);