const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

exports.registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        if (user.role === 'Admin' || user.role === 'Doctor') {
            req.status(400).json({
                status: 'fail',
                message: 'Invalid role',
            });
        }

        if (user.role === 'Doctor') {
            await Doctor.create({ userId: user._id, name: user.name });
        }

        res.status(201).json({
            status: 'success',
            data: {
                user,
                token,
                refreshToken,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        if (user.role === 'Doctor') {
            await Doctor.create({ userId: user._id, name: user.name });
        }

        res.status(201).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);
            const refreshToken = generateRefreshToken(user._id);

            res.status(200).json({
                status: 'success',
                data: {
                    user,
                    token,
                    refreshToken,
                },
            });
        } else {
            res.status(401).json({
                status: 'fail',
                message: 'Invalid email or password',
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
}

exports.banUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.banned = true;
        await user.save();

        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
}

exports.unbanUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.banned = false;
        await user.save();
        
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
}

exports.refreshToken = async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const newToken = generateToken(decoded.id);
        const newRefreshToken = generateRefreshToken(decoded.id);

        res.status(200).json({
            status: 'success',
            data: {
                token: newToken,
                refreshToken: newRefreshToken,
            },
        });
    } catch (err) {
        res.status(401).json({
            status: 'fail',
            message: 'Invalid refresh token',
        });
    }
};