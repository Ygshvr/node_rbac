const { DataTypes } = require("sequelize");
const sequelize = require("./connection");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notNull: {
        args: [true],
        msg: "email is a required field."
      },
      notEmpty: {
        args: [true],
        msg: "email is a required field."
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: [true],
        msg: "Password is a required field."
      },
      notEmpty: {
        args: [true],
        msg: "Password is a required field."
      }
    }
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: [true],
        msg: "Role is a required field."
      },
      notEmpty: {
        args: [true],
        msg: "Role is a required field."
      }
    }
  }
});

module.exports = {
  getUserById: async id => {
    let user = await User.findOne({
      attributes: ["id", "name", "email", "password", "role"],
      raw: true,
      where: { id }
    });
    if (!user) {
      throw new Error(`User with "${id}" does not exist.`);
    }
    return user;
  },
  getAllUsers: async () => {
    let allUsers = await User.findAll({
      attributes: ["id", "name", "email", "password", "role"],
      raw: true
    });
    allUsers = allUsers.sort((a, b) => {
      let nameA = a.name.toLowerCase();
      let nameB = b.name.toLowerCase();
      if (nameA > nameB) return 1;
      if (nameA < nameB) return -1;
      return 0;
    });
    return allUsers;
  },
  loginUser: async (email, password) => {
    let user = await User.findOne({
        attributes: ["id", "name", "email", "password", "role"],
        raw: true,
        where: { email, password }
      });
      if (!user) {
        throw new Error('Username or password is incorrect.');
      }
      return user;
  }
};
