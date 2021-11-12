const { mutipleMongooesToObject } = require('../../untill/mongooes');
const Product = require('../models/Product');

module.exports = function(req,res,next) {
    res.locals.cart = req.session.cart;
    res.locals.totalQuantityCart = 0;
    res.locals.cart.forEach(element => {
        res.locals.totalQuantityCart +=element.count;
    });
	next();
}