const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

router.post('/add/:id', cartController.add);
router.post('/plus', cartController.plus);
router.post('/reduce', cartController.reduce);
router.post('/quantity-change', cartController.quantityChange);
router.post('/remove-product-cart', cartController.removeProductCart);
router.get('/json', cartController.json);

router.get('/page-cart/quantity-plus/:index', cartController.pageCartPlus);
router.get('/page-cart/quantity-reduce/:index', cartController.pageCartReduce);
router.get('/page-cart/quantity-input/:index/:quantity', cartController.pageCartInput);

router.get('/', cartController.index);


module.exports = router;