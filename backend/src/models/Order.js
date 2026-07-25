const mongoose = require('mongoose');

// Embedded sub-document: each line item is always read together with its
// order, so it lives INSIDE the order rather than as its own collection.
const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 }, // price at time of order
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    type: { type: String, enum: ['purchase', 'sales'], required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }, // required only for purchase orders (enforce in controller)
    products: { type: [orderItemSchema], validate: (v) => v.length > 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'approved', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
