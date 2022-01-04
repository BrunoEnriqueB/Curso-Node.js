import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nodesequelize', 'root', '', {
    host: 'localhost',
    port: '3312',
    dialect: 'mysql',
    logging: false
})

export { sequelize as conn };