const { mutipleMongooesToObject } = require('../../untill/mongooes');
const collection = require('../models/Collection');

                            
class SiteController{
    home(req, res, next){
        
        // res.render('home');
        collection.find({})
            .then(collections =>{ 
                // const objectCollections = mutipleMongooesToObject(collections);
                // const vikingCollection = objectCollections.filter(objectCollection => objectCollection.name == 'viking');
                return res.render('home', {collections: mutipleMongooesToObject(collections)})
            })
            // .then( collections => res.json({collections}))
            .catch(next)
    }
}

module.exports = new SiteController;