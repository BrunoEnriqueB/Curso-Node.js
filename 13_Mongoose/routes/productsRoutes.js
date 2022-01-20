const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductsController');
const Product = require('../models/Product');


router.get('/', ProductController.showAllProducts);

router.get('/create', ProductController.create);
router.post('/create', ProductController.createProduct);

router.post('/edit', ProductController.editProduct);
router.get('/edit/:id', ProductController.edit);

router.get('/:id', ProductController.showOneProduct);
router.post('/remove/:id', ProductController.deleteOneProduct);



module.exports = router;