import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nodesequelize', 'root', '', {
    host: 'localhost',
    port: '3312',
    dialect: 'mysql'
})

try {
    sequelize.authenticate();
    console.log('Conectamos com sucesso com o sequelize!');
} catch (error) {
    console.log(error);
}

export { sequelize };