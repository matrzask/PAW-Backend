const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    author: { type: String, required: true },
    rating: { type: Number, required: true },
    content: { type: String, required: true }
});

module.exports = mongoose.model('Review', ReviewSchema);