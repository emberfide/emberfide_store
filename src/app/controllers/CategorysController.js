const Category = require('../models/Category')
const {mutipleMongooesToObject, mongooesToObject} = require('../../untill/mongooes');

class CategorysController{
    index(req, res, next){
        // Category.find({})
        //     .then(categorys => res.render('categorys'))
        Category.find({})
        .then(categorys =>  res.render('categorys', { categorys: mutipleMongooesToObject(categorys) }))
        .catch(next);
    }
}

module.exports = new CategorysController;