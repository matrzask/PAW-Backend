const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/refresh-token', authController.refreshToken);
router.get('/users', protect, authorize('Admin'), authController.getUsers);
router.post('/add-user', protect, authorize('Admin'), authController.addUser);
router.put('/ban-user/:id', protect, authorize('Admin'), authController.banUser);
router.put('/unban-user/:id', protect, authorize('Admin'), authController.unbanUser);

module.exports = router;