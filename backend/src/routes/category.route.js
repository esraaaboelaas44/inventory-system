const express = require('express');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller.js');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getCategories);
router.get('/:id', protect, getCategory);
router.post('/', protect, authorize('admin', 'manager'), createCategory);
router.put('/:id', protect, authorize('admin', 'manager'), updateCategory);
router.delete('/:id', protect, authorize('admin'), deleteCategory);

module.exports = router;