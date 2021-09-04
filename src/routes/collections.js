const express = require('express');
const router = express.Router();

const collectionsController = require('../app/controllers/CollectionsController');

router.get('/:slug', collectionsController.index);

module.exports = router;