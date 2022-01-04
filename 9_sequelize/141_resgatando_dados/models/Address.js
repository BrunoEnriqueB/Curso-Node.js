import { conn as sequelize} from "../db/conn.js";
import { DataTypes } from "sequelize";
import { User } from "./User.js";

const Address = sequelize.define('Address', {
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

User.hasMany(Address); //O usuário tem vários endereços
Address.belongsTo(User) //um endereço pertencen a um usuário, ou seja, dentro da tabela Adress, vai exsitir uma coluna user_id

export { Address };