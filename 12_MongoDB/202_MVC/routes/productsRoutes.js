const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductsController')


router.get('/', ProductController.showAllProducts);

module.exports = router;