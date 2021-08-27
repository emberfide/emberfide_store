const express = require('express');
const router = express.Router();

const sitesController = require('../app/controllers/sitesController');

router.get('/', sitesController.home);

module.exports = router;