const res = require("express/lib/response");


module.exports = class Products {
  static async getProducts(req, res) {
    res.status(200).json({message: "Teste"})
  }

  static async createProduct(req, res) {
    const { title, message } = req.body;

    if (!title) {
      return res.status(422).json({message: 'O campo title é obrigatório!'})
      
    }

    res.status(201).json({adminUser: "recebemos seus dados!", title: title, message: message})
  }
}