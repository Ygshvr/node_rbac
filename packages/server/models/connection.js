const { Sequelize } = require('sequelize');
// Setting up connection 
if(process.env.NODE_ENV === 'test') {
  module.exports = new Sequelize('TestDB', 'root', 'helloworld', {
    host: 'localhost',
    dialect: 'mariadb',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
}
else
{
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
}
