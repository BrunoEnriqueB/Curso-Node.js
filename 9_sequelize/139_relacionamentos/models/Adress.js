import { conn as sequelize} from "../db/conn.js";
import { DataTypes } from "sequelize";
import { User } from "./User.js";

const Adress = sequelize.define('Adress', {
    street: {
        type: DataTypes.STRING,
        required: true
    },
    number: {
        type: DataTypes.STRING,
        required: true
    },
    city: {
        type: DataTypes.STRING,
        required: true
    }
});

Adress.belongsTo(User) //um endereço pertencen a um usuário, ou seja, dentro da tabela Adress, vai exsitir uma coluna user_id

export { Adress };