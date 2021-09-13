const express = require('express');
// const express = require('../public/uploads');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: './src/public/uploads/' });

const adminController = require('../app/controllers/AdminController');

router.get('/product', adminController.product);
router.get('/upload-img', adminController.upload);

router.post('/product',upload.single('img'), adminController.createProduct);
router.post('/upload-img',upload.array('uploadedImages', 10), adminController.uploadImg);


router.get('/', adminController.index);

module.exports = router;