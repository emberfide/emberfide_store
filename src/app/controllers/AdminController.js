const { mutipleMongooesToObject, mongooesToObject } = require('../../untill/mongooes');
const Product = require('../models/Product');
const Collection = require('../models/Collection');
const UploadImg = require('../models/UploadImg');



                            
class AdminController{

    index(req, res){
        res.render('admin/admin',{ title: 'my other page', layout: 'admin' });
    }

    //GET admin/product
    product(req, res){
        let arrayCollections = [];
        let arrayImgs = [];
        Collection.find({})
            .then(collections => {arrayCollections = mutipleMongooesToObject(collections)});
        UploadImg.find({})
            .then(imgs => {arrayImgs = mutipleMongooesToObject(imgs)});
        Product.find({})
            .then(products => res.render('admin/product',{
                products: mutipleMongooesToObject(products),
                collections: arrayCollections,layout: 'admin',
                imgs: arrayImgs,
            }))
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
}

module.exports = new AdminController;