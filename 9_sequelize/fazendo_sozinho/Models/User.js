import { DataTypes } from "sequelize";
import { sequelize } from "../db/conn.js";

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    occupation: {
        type: DataTypes.STRING,
        required: true
    },
    newsletter: {
        type: DataTypes.BOOLEAN
    }
});

export { User };