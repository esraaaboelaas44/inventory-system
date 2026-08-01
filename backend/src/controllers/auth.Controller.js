const User = require('../models/user.model');
const bcrypt = require("bcryptjs");
const generateToken = require('../utils/generateToken');

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
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {

      return res.status(500).json({
      success: false,
      message: error.message
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

module.exports = { login, logout, getMe };
