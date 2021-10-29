const mongoose = require('mongoose');
const {mutipleMongooesToObject, mongooesToObject} = require('../../untill/mongooes');
const Product = require('../models/Product');

class CartController{
    add(req, res, next){
        Product.findOne({_id:req.params.id})
            .then(productNot => {
                let product = mongooesToObject(productNot); 
                if(req.session.cart == undefined){
                    console.log('cart=undefined')
                    req.session.cart = [];
                    product.count = parseInt(req.body.quantity);
                    product.chooseAttribute = req.body.chooseAttribute;
                    req.session.cart.push(product);
                }
                else{
                    let checkProduct = false;
                    req.session.cart.forEach(productItem => {
                        if(productItem._id == req.params.id){
                            let checkAttribute = []
                            productItem.chooseAttribute.forEach((item, index) => {
                                checkAttribute[index] = JSON.stringify(item)  === JSON.stringify(req.body.chooseAttribute[index]) ;
                            })
                            if(!checkAttribute.includes(false)){
                                console.log('test');
                                productItem.count += parseInt(req.body.quantity);
                                product.chooseAttribute = req.body.chooseAttribute;
                                checkProduct = true;
                            }
                        }
                    });
                    if(!checkProduct){
                        console.log('cart new')
                        product.count = parseInt(req.body.quantity);
                        product.chooseAttribute = req.body.chooseAttribute;
                        req.session.cart.push(product);
                    }  
                }
                req.session.save(function(err) {
                    // session saved
                  })
                res.redirect('back')
            })
        // res.json(req.body)
    }
    plus(req, res, next){
        res.locals.cart[req.body.index].count++;
        res.send(res.locals.cart);
    }
    reduce(req, res, next){
        res.locals.cart[req.body.index].count--;
        res.send(res.locals.cart);
    }
    quantityChange(req, res, next){
        res.locals.cart[req.body.index].count = parseInt(req.body.quantity);
        res.send(res.locals.cart);
    }
    removeProductCart(req, res, next){
        res.locals.cart.splice(req.body.index,1);
        console.log('lenght',res.locals.cart)
        res.send(res.locals.cart);
    }
    json(req,res,next){
        res.json(res.locals.cart)
    }
}

module.exports = new CartController;