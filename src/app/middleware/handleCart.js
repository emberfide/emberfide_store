const { mutipleMongooesToObject } = require('../../untill/mongooes');
const Product = require('../models/Product');

module.exports = function(req,res,next) {
    res.locals.cart = req.session.cart;
    res.locals.totalQuantityCart = 0;
    res.locals.totalPriceCart = 0;
    res.locals.cart.forEach(element => {
        res.locals.totalQuantityCart += element.count;
    });
    res.locals.cart.forEach(element => {
        res.locals.totalPriceCart += (element.price.sellPrice * element.count);
    });
    res.locals.totalPriceCart = res.locals.totalPriceCart.toFixed(2);
    res.locals.valueShipping = 5;
    if(res.locals.totalPriceCart > 99){
        res.locals.valueShipping = 0;
    }
	next();
}