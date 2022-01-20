const router = require('express').Router();
const Products = require('../controllers/Products')

router.get('/products', Products.getProducts)

router.post('/products', Products.createProduct)

module.exports = router;