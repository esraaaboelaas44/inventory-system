const express = require('express');
const {
  getAuthLogs,
  deleteAuthLog,
} = require('../controllers/authLog.controller.js');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('admin'), getAuthLogs);
router.delete('/', protect, authorize('admin'), deleteAuthLog);
router.delete('/:id', protect, authorize('admin'), deleteAuthLog);

module.exports = router;