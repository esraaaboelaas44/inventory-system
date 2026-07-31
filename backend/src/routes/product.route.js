const express = require('express');
const { body } = require('express-validator');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller.js');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

const productValidationRules = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('sku').trim().notEmpty().withMessage('SKU is required'),
  body('category').isMongoId().withMessage('Valid category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
];

router.use(protect);

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', authorize('admin', 'manager'), productValidationRules, validate, createProduct);
router.put('/:id', authorize('admin', 'manager'), productValidationRules, validate, updateProduct);
router.delete('/:id', authorize('admin', 'manager'), deleteProduct);

module.exports = router;
