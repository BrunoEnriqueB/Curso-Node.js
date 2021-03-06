const Product = require('../models/Product');


module.exports = class ProductController {
  static showAllProducts = async (req, res) => {
      const products = await Product.find().lean(); //resgatar os produtos e o lean converte os dados pro handlebars conseguir ler
      res.render('products/allproducts', {products});
  }

  static create = (req, res) => {
      res.render('products/create')
  }

    static createProduct = async (req, res) => {
      try {
          const { name, description, price, quantity, image } = req.body;

          const product = new Product({name, description, price, quantity, image});

          await product.save();

          res.redirect('/products');
      } catch (error) {
          console.log(error)
      }
    }

    static showOneProduct = async (req, res) => {
      const { id } = req.params;
      const product = await Product.findById(id).lean()

      res.render('products/product', { product });
        
    }

    static deleteOneProduct = async (req, res) => {
      const { id } = req.params;
      await Product.deleteOne({_id: id});

      res.redirect('/products');


    }

    static edit = async (req, res) => {
      const { id } = req.params;
      const product = await Product.findById(id).lean()

      res.render('products/edit', { product });
    }

    static editProduct = async (req, res) => {
      const { id, name, description, price, quantity, image } = req.body;
      const data = {
        name, description, price, quantity, image
      }

      await Product.updateOne({_id: id}, data);

      res.redirect('/products');
  }

}