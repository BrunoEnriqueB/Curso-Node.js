import { DataTypes } from "sequelize";
import { conn } from "../db/conn.js";

const Task = conn.define('Task', {
    title: {
        type: DataTypes.STRING,
        required: true
    },
    description: {
        type: DataTypes.STRING,
        required: true
    },
    done: {
        type: DataTypes.BOOLEAN,
        required: true
    }
});

export { Task };