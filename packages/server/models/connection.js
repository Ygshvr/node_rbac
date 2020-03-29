const { Sequelize } = require('sequelize');
// Setting up connection 
module.exports = new Sequelize('AppDB', 'root', 'helloworld', {
  host: 'localhost',
  dialect: 'mariadb',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
