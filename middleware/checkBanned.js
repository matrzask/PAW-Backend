const User = require('../models/userModel');

const checkBanned = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.banned) {
            return res.status(403).json({
                status: 'fail',
                message: 'You are banned from performing this action'
            });
        }
        next();
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'Server error'
        });
    }
};

module.exports = checkBanned;