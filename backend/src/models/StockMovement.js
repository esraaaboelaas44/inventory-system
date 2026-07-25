const mongoose = require('mongoose');

const stockMovementSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }, // positive = addition, negative = removal
    type: { type: String, enum: ['addition', 'removal', 'adjustment'], required: true },
    reference: { type: String, trim: true }, // e.g. order number, or "manual adjustment"
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StockMovement', stockMovementSchema);
