const express = require('express');
const router = express.Router();

const categorysController = require('../app/controllers/CategorysController');

router.get('/', categorysController.index);

module.exports = router;