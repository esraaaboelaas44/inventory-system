const AuthLog = require("../models/authLog.model");

// GET /api/auth-logs
const getAuthLogs = async (req, res) => {
  try {
    const logs = await AuthLog.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /api/auth-logs
const deleteAuthLog = async (req, res) => {
  try {
    if (req.params.id) {
      const log = await AuthLog.findByIdAndDelete(req.params.id);

      if (!log) {
        return res.status(404).json({
          success: false,
          message: "Log not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Log deleted successfully",
      });
    }

    await AuthLog.deleteMany({});

    return res.status(200).json({
      success: true,
      message: "All logs deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAuthLogs,
  deleteAuthLog,
};