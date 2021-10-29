const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

router.post('/add/:id', cartController.add);
router.post('/plus', cartController.plus);
router.post('/reduce', cartController.reduce);
router.post('/quantity-change', cartController.quantityChange);
router.post('/remove-product-cart', cartController.removeProductCart);
router.get('/json', cartController.json);


module.exports = router;