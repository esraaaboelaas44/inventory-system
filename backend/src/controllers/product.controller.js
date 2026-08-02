const Product = require('../models/product.model.js');
const Category = require('../models/category.model.js');
const Supplier = require('../models/supplier.model.js');
const asyncHandler = require('../utils/asyncHandler.js');
const {createStock} = require("../utils/creatStock.js");

const getProducts = asyncHandler(async (req, res) => {
  const { category, search, lowStock } = req.query;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const filter = {};

  if (category) filter.category = category;
  if (search) {
    const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.$or = [
      { name: { $regex: safeSearch, $options: 'i' } },
      { sku: { $regex: safeSearch, $options: 'i' } },
      { description: { $regex: safeSearch, $options: 'i' } },
    ];
  }

  if (lowStock === 'true') {
    filter.$expr = { $lte: ['$quantity', '$lowStockThreshold'] };
  }

  let products = await Product.find(filter)
  .populate('category', 'name')
  .populate('supplier', 'name')
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit);

  const total = await Product.countDocuments(filter);

  res.status(200).json({
  success: true,
  count: products.length,
  total,
  page,
  pages: Math.ceil(total / limit),
  data: products,
  });
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
  await createStock(product._id,"Add",product.quantity,product.category,req.user._id);
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
  await createStock(product._id,"Update",product.quantity,product.category,req.user._id);
  res.status(200).json({ success: true, data: product });
  
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  await createStock(product._id,"Remove",product.quantity,product.category,req.user._id);
  res.status(200).json({ success: true, message: 'Product deleted' });
  
});

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
