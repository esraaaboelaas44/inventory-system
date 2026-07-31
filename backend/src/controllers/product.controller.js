const Product = require('../models/product.model.js');
const Category = require('../models/category.model.js');
const Supplier = require('../models/supplier.model.js');
const asyncHandler = require('../utils/asyncHandler');

const getProducts = asyncHandler(async (req, res) => {
  const { category, search, lowStock } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (search) filter.name = { $regex: search, $options: 'i' };

  let products = await Product.find(filter).populate('category', 'name').populate('supplier', 'name').sort({ createdAt: -1 });

  if (lowStock === 'true') {
    products = products.filter((p) => p.quantity <= p.lowStockThreshold);
  }

  res.status(200).json({ success: true, count: products.length, data: products });
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name').populate('supplier', 'name');
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.status(200).json({ success: true, data: product });
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});


const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.status(200).json({ success: true, data: product });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.status(200).json({ success: true, message: 'Product deleted' });
});

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
