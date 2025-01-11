const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

exports.registerUser = async (req, res) => {
    const { name, email, password, age, gender, role } = req.body;

    try {
        const user = await User.create({ email, password, name, age, gender, role });
        console.log(user);
        const token = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

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