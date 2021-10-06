const { mutipleMongooesToObject } = require('../../untill/mongooes');
const Product = require('../models/Product');

module.exports = function(req,res,next) {
	// console.log(req.session.cart);
    res.locals.cart = req.session.cart;
    res.locals.countCart = req.session.countCart;
    // console.log(res.locals.cart);
	next();
}