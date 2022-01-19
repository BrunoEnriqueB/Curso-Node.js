const Product = require('../models/Product');


module.exports = class ProductController {
    static showAllProducts = async (req, res) => {
        const products = await Product.findAll();
        res.render('products/allproducts', {products});
    }

    static createForm = async (req, res) => {
        res.render('products/create')
    }

    static createProduct = async (req, res) => {
        try {
            const { name, description, price, quantity, image } = req.body;

            const product = new Product(name, description, price, quantity, image);
        
            await product.save();

            res.redirect('/products');
        } catch (error) {
            console.log(error)
        }
    }

    static showOneProduct = async (req, res) => {
        const { id } = req.params;

        const product = await Product.findOne(id)

        res.render('products/product', {product});
        
    }

}