const express = require('express');
const router = express.Router();

const sitesController = require('../app/controllers/CheckOutController');

router.get('/', sitesController.checkOut)

module.exports = router;