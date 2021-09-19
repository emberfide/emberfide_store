const express = require('express');
// const express = require('../public/uploads');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: './src/public/uploads/' });

const adminController = require('../app/controllers/AdminController');

router.get('/product', adminController.product);
router.get('/upload-img', adminController.upload);
router.get('/update/product/:id', adminController.editProduct);

router.post('/product',upload.single('img'), adminController.createProduct);
router.post('/upload-img',upload.array('uploadedImages', 10), adminController.uploadImg);

router.put('/update/product/:id', adminController.updateProduct);





router.get('/', adminController.index);

module.exports = router;