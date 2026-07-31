const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, required: true, unique: true, trim: true, uppercase: true },
    description: { type: String, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    lowStockThreshold: { type: Number, default: 10 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    
  },
  { timestamps: true }
);


productSchema.virtual('isLowStock').get(function () {
  return this.quantity <= this.lowStockThreshold;
});
productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
