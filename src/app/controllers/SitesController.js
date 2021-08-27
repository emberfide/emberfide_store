
const Category = require('../models/Category')
class SiteController{
    home(req, res){
        res.render('home');
        
    }
}

module.exports = new SiteController;