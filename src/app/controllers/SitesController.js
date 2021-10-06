const { mutipleMongooesToObject } = require('../../untill/mongooes');
const Collection = require('../models/Collection');
const Product = require('../models/Product');

                            
class SiteController{
    home(req, res, next){
        // req.session.isAuth = true;
        // if(res.locals.cart !== undefined){
        // console.log(res.locals.cart);
        // }
        Promise.all([Collection.find({}),Product.find({})])
            .then(([collections,products]) =>
                res.render('home',{
                    collections:mutipleMongooesToObject(collections),
                    products:mutipleMongooesToObject(products),
                })
            )
    }
}

module.exports = new SiteController;