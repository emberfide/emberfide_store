const product = require('../models/Product');
const {mutipleMongooesToObject, mongooesToObject} = require('../../untill/mongooes');

class CollectionsController{
    // index(req, res){
    //     res.render('collections')
    // }
    index(req, res){
       
        product.find({})
            .then(products => {
                let productsCollection = mutipleMongooesToObject(products).filter(products => products.nameCollection == req.params.slug);
                res.render('collections', {productsCollection, params: req.params.slug})}
            )
    }
}

module.exports = new CollectionsController;