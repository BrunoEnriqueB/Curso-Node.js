import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nodesequelize', 'root', '', {
    host: 'localhost',
    port: '3312',
    dialect: 'mysql'
})

export { sequelize as conn };