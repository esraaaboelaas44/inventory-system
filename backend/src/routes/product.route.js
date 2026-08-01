const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller.js');

const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getProducts);
router.get('/:id', protect, getProduct);
router.post('/', protect, authorize('admin', 'manager'), createProduct);
router.put('/:id', protect, authorize('admin', 'manager'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;