const { mutipleMongooesToObject } = require('../../untill/mongooes');
const Product = require('../models/Product');
const Collection = require('../models/Collection');

                            
class AdminController{

    index(req, res){
        res.render('admin/admin',{ title: 'my other page', layout: 'admin' });
    }

    //GET admin/product
    product(req, res){
        let arrayCollections = [];
        Collection.find({})
            .then(collections => {arrayCollections = mutipleMongooesToObject(collections)})
        Product.find({})
            .then(products => res.render('admin/product',{products: mutipleMongooesToObject(products),collections: arrayCollections,layout: 'admin'}))
        
    }

    //POST admin/product
    createProduct(req, res){
        const product = new Product(req.body);
        product.save()
            .then(() => res.redirect('/admin/product'))
        // res.json(req.body)
    }
}

module.exports = new AdminController;