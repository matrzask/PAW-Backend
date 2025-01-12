require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: 'Admin' });

        if (!adminExists) {
            const admin = new User({
                name: 'Admin',
                email: 'admin@admin.com',
                gender: 'Other',
                age: 30,
                password: 'admin1',
                role: 'Admin',
            });

            await admin.save();
            console.log('Admin account created');
        } else {
            console.log('Admin account already exists');
        }
    } catch (err) {
        console.error(err.message);
    } finally {
        mongoose.connection.close();
    }
};

connectDB().then(seedAdmin);