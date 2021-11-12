const Product = require('../models/Product');
const { mutipleMongooesToObject, mongooesToObject } = require('../../untill/mongooes');


class ProductsController{
    index(req, res){
        Product.findOne({slug: req.params.slug})
            .then((product) => {
                const attributeHavePrice = product.attribute.find((item) => {
                    return item.arrayElement[0].realPrice;
                })
                const attributeTypeButton = product.attribute.filter((item) =>{
                    return item.type == "button"; 
                })
                const attributeTypeImg = product.attribute.filter((item) =>{
                    return item.type == "img"; 
                })
                return res.render('products',
                    {
                        product: mongooesToObject(product),
                        priceAttribute: mongooesToObject(attributeHavePrice),
                        attributeTypeButton: mutipleMongooesToObject(attributeTypeButton),
                        attributeTypeImg: mutipleMongooesToObject(attributeTypeImg),
                    }
                )
            })
    }
}

module.exports = new ProductsController;