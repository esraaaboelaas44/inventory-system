const Category = require('../models/category.model.js');
const Product = require('../models/product.model.js');
const asyncHandler = require('../utils/asyncHandler');


const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.status(200).json({ success: true, count: categories.length, data: categories });
});


const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }
  res.status(200).json({ success: true, data: category });
});


const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, message: 'Category created successfully', data: category });
});


const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }
  res.status(200).json({ success: true, message: 'Category updated successfully', data: category });
});


const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }

  const productCount = await Product.countDocuments({ category: category._id });
  if (productCount > 0) {
    return res.status(400).json({
      success: false,
      message: `Cannot delete category: ${productCount} product(s) are still assigned to it`,
    });
  }

  await category.deleteOne();
  res.status(200).json({ success: true, message: 'Category deleted' });
});

module.exports = { getCategories, getCategory, createCategory, updateCategory, deleteCategory };
