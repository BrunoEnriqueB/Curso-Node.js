import express from 'express';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nodemvc', 'root', '', {
    host: 'localhost',
    port: 3312,
    dialect: 'mysql',
    logging: false
});

// try {
//     sequelize.authenticate();
//     console.log('Conectado ao Banco!');
// } catch (error) {
//     console.log(error);
// }

export { sequelize as conn};