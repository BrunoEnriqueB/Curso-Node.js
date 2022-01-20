const res = require("express/lib/response");


module.exports = class Products {
  static async getProducts(req, res) {
    return res.json({message: "Teste"})
  }

  static async createProduct(req, res) {
    const { title, message } = req.body;

    return res.json({adminUser: "recebemos seus dados!", title: title, message: message})
  }
}