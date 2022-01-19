const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductsController');


router.get('/', ProductController.showAllProducts);

router.get('/create', ProductController.createForm);
router.post('/create', ProductController.createProduct);


module.exports = router;