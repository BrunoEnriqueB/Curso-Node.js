import { DataTypes } from "sequelize";
import { conn } from "../db/conn.js";

const User = conn.define('User', {
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