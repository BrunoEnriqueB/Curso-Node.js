const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductsController');


router.get('/', ProductController.showAllProducts);

router.get('/create', ProductController.create);
router.post('/create', ProductController.createProduct);

router.get('/:id', ProductController.showOneProduct);
router.post('/remove/:id', ProductController.deleteOneProduct);



module.exports = router;