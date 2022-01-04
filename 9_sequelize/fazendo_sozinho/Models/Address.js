import { sequelize } from "../db/conn.js";
import { DataTypes } from "sequelize";
import { User } from './User.js'

const Address = sequelize.define('Address',  {
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

User.hasMany(Address);
Address.belongsTo(User);

export { Address };