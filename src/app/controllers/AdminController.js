const { mutipleMongooesToObject, mongooesToObject } = require('../../untill/mongooes');
const Product = require('../models/Product');
const Collection = require('../models/Collection');
const UploadImg = require('../models/UploadImg');
const Attribute = require('../models/Attribute');
      
class AdminController{
    index(req, res){
        res.render('admin/admin',{ title: 'my other page', layout: 'admin' });
    }

    //GET admin/product
    product(req, res,next){
        Promise.all(
            [
                Collection.find({}),
                UploadImg.find({}),
                Product.find({}),
                Product.countDocumentsDeleted({}),
                Attribute.find({}),
            ])
            .then(([collections,imgs,products,count,attributes]) => {
                res.render('admin/product',{
                    products: mutipleMongooesToObject(products),
                    collections: mutipleMongooesToObject(collections),
                    imgs: mutipleMongooesToObject(imgs),
                    count,
                    attributes: mutipleMongooesToObject(attributes),
                    layout: 'admin',
                })
            })
            .catch(next);
    }
    //GET admin/upload-img
    upload(req, res){
        // console.log
        UploadImg.find({})
            .then(imgs => { return res.render('admin/upload',{imgs: mutipleMongooesToObject(imgs),layout:'admin'})});
        // res.render('admin/upload',{layout: 'admin'});
    }
    //GET admin/update/product/:id
    editProduct(req, res){
        let collectionsToObject = [];
        Collection.find({})
            .then(collections => {collectionsToObject = mutipleMongooesToObject(collections)});
        Product.findOne({_id: req.params.id})
            .then(product => res.render('admin/editProduct',{
                collections:collectionsToObject,
                product: mongooesToObject(product),
                layout:'admin',
            }))
    }
    //GET admin/trash/product
    trashProduct(req,res,next){
        Product.findDeleted({})
            .then(products => res.render('admin/trashProduct',{products: mutipleMongooesToObject(products),layout:'admin'}))
            .catch(next);
    }

    //PUT admin/update/product/:id
    updateProduct(req, res, next){
        Product.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/admin/product'))
            .catch(next);
    }
    

    //PATCH admin/restore/product:id
    restoreProduct(req, res, next){
        Product.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
    }
    //DELETE admin/delete/product:id
    deleteProduct(req, res, next){
        Product.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //DELETE admin/force/delete/product/:id
    forceDeleteProduct(req, res, next){
        Product.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //POST admin/product
    createProduct(req, res){
        const product = new Product(req.body);
        product.save()
            .then(() => res.redirect('/admin/product'))
        // res.json(req.body)
    }
    //POST admin/upload-img
    uploadImg(req, res){
        var files = req.files.map(file => {
            var obj = {path:file.path.split('\\').slice(2).join('\\')}
            return obj;
        })
        UploadImg.insertMany(files, function(err) {
            res.redirect('/admin/upload-img')
        });
    }
    //POST admin/action/product
    actionProduct(req,res,next){
        Product.delete({_id: req.body.productIds})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //POST admin/action/trash-product
    actionTrashProduct(req,res,next){
        switch(req.body.action){
            case 'restore':
                Product.restore({_id: req.body.trashProductIds})
                    .then(() => res.redirect('back'))
                break;
            case 'delete':
                Product.deleteMany({_id: req.body.trashProductIds})
                    .then(() => res.redirect('back'))
                break;
            default:
                res.json({message:'error'});
        }
    }
    //GET admin/attribute
    attribute(req, res,next){
        Attribute.find({})
            .then((attributes) => res.render('admin/attribute',
            {
                attributes:mutipleMongooesToObject(attributes),
                layout:'admin.hbs'
            }))
    }
    //POST admin/attribute/create
    createAttribute(req, res,next){
        const attribute = new Attribute(req.body);
        attribute.save()
            .then(() => res.redirect('/admin/attribute'))
        // res.json(req.body)
    }
    //GET admin/attribute/:id
    attributeElement(req, res,next){
        Promise.all(
            [
                Attribute.findOne({_id: req.params.id}),
                UploadImg.find({}),
                
            ]
            )
            .then(([attribute,imgs]) =>{
                res.render('admin/attributeElement',
                {
                    attribute: mongooesToObject(attribute),
                    imgs: mutipleMongooesToObject(imgs),
                    layout:'admin.hbs'
                })
            })
            .catch(next)
    }
    //PUT admin/attribute/:id/create
    createAttributeElement(req, res,next){
        Attribute.updateOne({_id: req.params.id},{$push: {arrayElement:req.body.arrayElement} })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //DELETE admin/attribute/:id
    deleteAttribute(req, res, next){
        Attribute.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // PUT admin/attribute/edit/:id
    editAttribute(req, res, next){
        Attribute.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // PUT admin/attribute/element/edit/:id
    editAttributeElement(req, res, next){
        Attribute.updateOne({_id: req.body.idAttribute,"arrayElement._id": req.params.id},
            {
                $set: {
                    "arrayElement.$.name": req.body.arrayElement[0].name
                } 
            } 
        )
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // DELETE admin/attribute/element/delete/:id
    deleteAttributeElement(req, res, next){
        Attribute.updateOne({_id: req.body.idAttribute},
            {
                $pull: {
                    arrayElement: {_id: req.params.id}
                }
            }
        )
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new AdminController;