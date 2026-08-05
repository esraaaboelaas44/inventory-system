const User = require('../models/user.model');
const bcrypt = require("bcryptjs");
const generateToken = require('../utils/generateToken');
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const AuthLog = require("../models/authLog.model");

// @route POST /api/auth/login
const login = async (req, res) => {
  try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }
    
      if (!user.isActive) {
        return res.status(403).json({
        success: false,
        message: "Account is inactive"
      });
}
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const token = generateToken(user._id);
      await AuthLog.create({
      user: user._id,
      action: "LOGIN",
      });
     return res.status(200).json({
      success: true,
      data: { id: user._id, name: user.name, email: user.email, role: user.role },
       token,
     });
    
    } catch (error) {

        return res.status(500).json({
        success: false,
        message: error.message
      });
  }
};

// @route POST /api/auth/logout

const logout = async (req, res) => {
    try {  
      await AuthLog.create({
      user: req.user._id,
      action: "LOGOUT",
      });
      res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {

      return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is inactive, please contact admin",
      });
    }

    // Generate and hash Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + (15 * 60 * 1000);
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Password",
      text: `Click the following link to reset your password:\n\n${resetUrl}`,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset link sent successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route POST /api/auth/reset-password/:resetToken

const resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;

    // Hash the token received from URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Hash new password
    user.password = await bcrypt.hash(password, 10);

    // Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // Generate new login token
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route GET /api/auth/me

const getMe = async (req, res) => {
  try {  
    res.status(200).json({ success: true, data: req.user });
  } catch (error) {

      return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { login, logout, getMe, forgotPassword, resetPassword };
