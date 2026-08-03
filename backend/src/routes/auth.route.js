const express = require('express');
const { login, logout, getMe, forgotPassword, resetPassword } = require("../controllers/auth.controller");
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;
