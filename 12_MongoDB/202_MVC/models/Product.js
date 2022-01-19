const conn = require('../db/conn');
const { ObjectId } = require('mongodb'); //adicionar a estrutura de object ID que existe por padrão no MongoDB
module.exports = class Product {
    constructor(name, description, price, quantity, image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
    }

    save() {
        const product = conn.db().collection('product').insertOne({
            name: this.name,
            description: this.description,
            price: this.price,
            quantity: this.quantity,
            image: this.image
        });
        return product;
    }

    static findAll() {
        const products = conn.db().collection('product').find().toArray();
        return products;
    }

    static findOne(id) {
        const product = conn.db().collection('product').findOne({_id: ObjectId(id)});
        return product;
    }
}

