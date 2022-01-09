const Sequelize = require('sequelize');

const conn = new Sequelize('node_thoughts', 'root', '', {
    host: 'localhost',
    port: 3312,
    dialect: "mysql",
    logging: false
})

// try {
//     conn.authenticate();
//     console.log('Conectado ao banco de dados!');
// } catch (error) {
//     console.log(error);
// }

module.exports = conn;