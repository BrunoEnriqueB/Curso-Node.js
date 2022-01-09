const DataTypes = require('sequelize');
const db = require('../db/conn.js');
const User = require('./User.js');

const Thought = db.define('Thought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    }
});

User.hasMany(Thought);
Thought.belongsTo(User);

module.exports = Thought