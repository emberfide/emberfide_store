const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.get('/product', adminController.product);
router.post('/product', adminController.createProduct);

router.get('/', adminController.index);

module.exports = router;