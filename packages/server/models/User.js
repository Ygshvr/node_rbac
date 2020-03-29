const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const User = sequelize.define('User',{
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: {
                args: [/^[\w\d]+$/i],
                msg: "UserId should be start with alphanumeric"
            },
            notNull: {
                args: [true],
                msg: "UseId is a required field."
            }
        }
    }
});

module.exports = {
    getUserById: async (id) => {
        let user = await User.findOne({where: {
            userId: id
        }});
        if(!user) {
            throw new Error(`User "${id}" does not exist.`);
        }
        return user;
    },
    createUser: async (user) => {
        try {
            let newUser = await User.create({
                firstName: user.firstName,
                lastName: user.lastName,
                userId: user.userId
            })
            if(!newUser) {
                return new Error('Unable to create user');
            }
            return newUser;
        } 
        catch (error) {
            if(error.name === 'SequelizeUniqueConstraintError') {
                throw new Error(`User "${user.userId}" already exists.`)
            }
            throw error.errors ? new Error(error.errors[0].message) : error;
        }
    }
};