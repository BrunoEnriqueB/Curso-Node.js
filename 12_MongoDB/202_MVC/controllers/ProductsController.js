const Product = require('../models/Product')

module.exports = class ProductController {
    static showAllProducts = async (req, res) => {
        res.render('products/allproducts')
    }
}