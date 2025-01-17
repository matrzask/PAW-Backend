const Review = require('../models/reviewModel');
const mongoose = require('mongoose');

exports.getReviews = async (req, res) => {
    try {
        const doctorId = req.query.doctorId;
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(200).json([]);
        }
        const reviews = await Review.find({ doctorId: doctorId });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.addReview = async (req, res) => {
    try {
        if (req.body.rating < 1 || req.body.rating > 5) {
            return res.status(400).json({
                status: 'fail',
                message: 'Rating must be between 1 and 5'
            });
        }
        const newReview = await Review.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                review: newReview
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({
                status: 'fail',
                message: 'No review found with that ID'
            });
        }
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

exports.addReply = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review || review.doctorId.toString() !== req.body.doctorId) {
            return res.status(404).json({
                status: 'fail',
                message: 'No review found with that ID'
            });
        }
        review.reply = req.body.reply;
        await review.save();
        res.status(200).json({
            status: 'success',
            data: {
                review
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}
