const { MongoClient } = require('mongodb');

//cria o banco na hora de conectar
const url = "mongodb://localhost:27017/testemongodb";

const client = new MongoClient(url)

const run = async () => {
    try {
        await client.connect();
        console.log('Conectando ao MongoDB')
    } catch (error) {
        console.log(error)
    }
}

run();

module.exports = client;