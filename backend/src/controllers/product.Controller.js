const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

// @route GET /api/products?category=&search=&lowStock=true
const getProducts = asyncHandler(async (req, res) => {
  const { category, search, lowStock } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (search) filter.name = { $regex: search, $options: 'i' };

  let products = await Product.find(filter).populate('category', 'name').sort({ createdAt: -1 });

  // lowStock filtering happens after fetch since it depends on comparing two fields
  if (lowStock === 'true') {
    products = products.filter((p) => p.quantity <= p.lowStockThreshold);
  }

  res.status(200).json({ success: true, count: products.length, data: products });
});

// @route GET /api/products/:id
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name');
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.status(200).json({ success: true, data: product });
});

// @route POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});

// @route PUT /api/products/:id
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

// @route DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.status(200).json({ success: true, message: 'Product deleted' });
});

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
