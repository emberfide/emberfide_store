const Product = require('../models/Product');
const { mutipleMongooesToObject, mongooesToObject } = require('../../untill/mongooes')

class CheckOutController{
    checkOut(req, res){
        res.render('checkOut',{layout:'checkOut'});
    }
}

module.exports = new CheckOutController;