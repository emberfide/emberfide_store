const { mutipleMongooesToObject } = require('../../untill/mongooes');
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
        Collection.find({})
            .then(collections => {arrayCollections = mutipleMongooesToObject(collections)})
        Product.find({})
            .then(products => res.render('admin/product',{products: mutipleMongooesToObject(products),collections: arrayCollections,layout: 'admin'}))
        
    }
    //GET admin/upload-img
    upload(req, res){
        console.log
        UploadImg.find({})
            .then(imgs => {console.log(imgs); return res.render('admin/upload',{imgs: mutipleMongooesToObject(imgs),layout:'admin'})});
        // res.render('admin/upload',{layout: 'admin'});
    }

    //POST admin/product
    createProduct(req, res){
        const file = req.file.path;
        req.body.urlImg = file.split('\\').slice(2).join('/');
        const product = new Product(req.body);
        console.log(req.body);
        product.save()
            .then(() => res.redirect('/admin/product'))
        // res.json(req.body);

    }
    //POST admin/upload-img
    uploadImg(req, res){
        // const uploadImg = new UploadImg(req.files)
        // UploadImg.map((img => img.path))\

        var files = req.files.map(file => {
            var obj = {path:file.path.split('\\').slice(2).join('\\')}
            return obj;
        })
        console.log(files);
        UploadImg.insertMany(files, function(err) {
            res.redirect('/admin/upload-img')
        });
    }
}

module.exports = new AdminController;