const sequelize = require('sequelize');
const Model = sequelize.Model;
const db = require('./connection');

class User extends Model {

}

User.init({
    firstName: {
        type: sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize.STRING,
    },
    userName: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {sequelize});

module.exports = User;