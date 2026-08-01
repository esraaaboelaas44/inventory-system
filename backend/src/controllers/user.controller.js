const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({
        message: "User already exists"
});
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    
    const newUser = await User.create(req.body);

    return res.status(201).json(newUser);

  } catch (error) {

      return res.status(500).json({
      message: error.message
    });
  }
};

exports.getUsers = async (req, res) => {
    
  try {

    const users = await User.find();

    res.status(200).json(users);

  } catch (error) {
      return res.status(500).json({
      message: error.message
    });
  }
  
};

exports.getUserById = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {

      return res.status(500).json({
      message: error.message
    });

  }
};

exports.updateUser = async (req, res) => {
  try {

      if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
        return res.status(404).json({
        message: "User not found"
      });
    }

      return res.status(200).json({
      message: "User updated successfully",
      data: user
    });

  } catch (error) {
      return res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return res.status(404).json({
        message: "User not found"
      });
    }

      return res.status(200).json({
      message: "User deleted successfully",
      data: user
    });

  } catch (error) {

      return res.status(500).json({
      message: error.message
    });

  }
};
