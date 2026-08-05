const mongoose = require("mongoose");

const authLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      enum: ["LOGIN", "LOGOUT"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AuthLog", authLogSchema);