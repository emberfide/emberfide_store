const Product = require('../models/Product');
const { mutipleMongooesToObject, mongooesToObject } = require('../../untill/mongooes')

class ProductsController{
    index(req, res){
        Product.findOne({slug: req.params.slug})
            .then(product => res.render('products',{product: mongooesToObject(product) }))
    }
}

module.exports = new ProductsController;