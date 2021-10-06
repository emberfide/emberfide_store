const mongoose = require('mongoose');
const {mutipleMongooesToObject, mongooesToObject} = require('../../untill/mongooes');
const Product = require('../models/Product');

class CartController{
    add(req, res, next){
        Product.findOne({_id:req.params.id})
            .then(productNot => {
                let product = mongooesToObject(productNot); 
                if(req.session.cart == undefined){
                    req.session.cart = [];
                    req.session.countCart = 1;
                    product.count = 1;
                    req.session.cart.push(product);
                }
                else{
                    let checkProduct = false;
                    req.session.cart.forEach(productItem => {
                        if(productItem._id == req.params.id){
                            productItem.count++;
                            checkProduct = true;
                        }
                    });
                    if(!checkProduct){
                        req.session.countCart += 1;
                        product.count = 1;
                        req.session.cart.push(product);
                    }  
                }
                req.session.save(function(err) {
                    // session saved
                  })
            })
        res.redirect('back');
    }
}

module.exports = new CartController;