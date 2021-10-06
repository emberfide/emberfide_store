const express = require('express');
// const express = require('../public/uploads');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: './src/public/uploads/' });

const adminController = require('../app/controllers/AdminController');

router.get('/product', adminController.product);
router.get('/upload-img', adminController.upload);
router.get('/update/product/:id', adminController.editProduct);
router.get('/trash/product', adminController.trashProduct);
router.get('/attribute/:id', adminController.attributeElement);
router.get('/attribute', adminController.attribute);


router.post('/product',upload.single('img'), adminController.createProduct);
router.post('/upload-img',upload.array('uploadedImages', 10), adminController.uploadImg);
router.post('/action/product', adminController.actionProduct);
router.post('/action/trash-product', adminController.actionTrashProduct);
router.post('/attribute/:id/create',adminController.createAttributeElement);
router.post('/attribute/create',adminController.createAttribute);



router.put('/update/product/:id', adminController.updateProduct);
router.patch('/restore/product/:id', adminController.restoreProduct);
router.put('/attribute/edit/:id', adminController.editAttribute);

router.delete('/delete/product/:id', adminController.deleteProduct);
router.delete('/force/delete/product/:id', adminController.forceDeleteProduct);
router.delete('/attribute/delete/:id', adminController.deleteAttribute);







router.get('/', adminController.index);

module.exports = router;