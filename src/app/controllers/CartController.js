const mongoose = require('mongoose');
const {mutipleMongooesToObject, mongooesToObject} = require('../../untill/mongooes');
const Product = require('../models/Product');

class CartController{
    index(req, res,next){
        res.render('cart',{layout:'cart'});
    }
    add(req, res, next){
        Product.findOne({_id:req.params.id})
            .then(productNot => {
                let product = mongooesToObject(productNot); 
                if(req.session.cart == undefined){
                    req.session.cart = [];
                    product.count = parseInt(req.body.quantity);
                    product.chooseAttribute = req.body.chooseAttribute;
                    req.body.price.sellPrice = parseFloat(req.body.price.sellPrice);
                    req.body.price.realPrice = parseFloat(req.body.price.realPrice);
                    product.price = req.body.price;
                    product.urlImgChooseAttribute  = req.body.urlImgChooseAttribute;
                    req.session.cart.push(product);
                }
                else{
                    let checkProduct = false;
                    req.session.cart.forEach(productItem => {
                        if(productItem._id == req.params.id){
                            // let checkAttribute = []
                            // productItem.chooseAttribute.forEach((item, index) => {
                            //     checkAttribute[index] = JSON.stringify(item)  === JSON.stringify(req.body.chooseAttribute[index]) ;
                            // })
                            if(JSON.stringify(productItem.chooseAttribute) == JSON.stringify(req.body.chooseAttribute)){
                                productItem.count += parseInt(req.body.quantity);
                                checkProduct = true;
                            }
                        }
                    });
                    if(!checkProduct){
                        product.count = parseInt(req.body.quantity);
                        product.chooseAttribute = req.body.chooseAttribute;
                        req.body.price.sellPrice = parseFloat(req.body.price.sellPrice);
                        req.body.price.realPrice = parseFloat(req.body.price.realPrice);
                        product.price = req.body.price;
                        req.session.cart.push(product);
                        product.urlImgChooseAttribute  = req.body.urlImgChooseAttribute;
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
        res.send(res.locals.cart);
    }
    json(req,res,next){
        res.json(res.locals.cart)
    }
    pageCartPlus(req,res,next){
        res.locals.cart[req.params.index].count++;
        res.redirect('back');
    }
    pageCartReduce(req,res,next){
        res.locals.cart[req.params.index].count--;
        res.redirect('back');
    }
    pageCartInput(req,res,next){
        res.locals.cart[req.params.index].count = parseInt(req.params.quantity);
        res.redirect('back');
    }
}

module.exports = new CartController;