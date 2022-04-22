const express = require('express');
const router = express.Router();
const admin_controller = require('../controllers/admin_controller');

// Redirect to admin login
router.get('/', admin_controller.admin_index);

module.exports = router;
