const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  phone: { type: String, required: true, trim: true },
  address: { type: String, trim: true },
  contactPerson: {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-()]{10,}$/, "Please enter a valid phone number"],
    },
  },
  isActive: { type: Boolean, default: true },
  industry: { type: String, trim: true },
});

module.exports = mongoose.model("Supplier", supplierSchema);
