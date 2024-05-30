const Sequelize = require('sequelize');

const TEST_FLAG = process.env.NODE_ENV === 'test' ? '_test' : '';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `./database${TEST_FLAG}.sqlite3`,
});

module.exports = { sequelize };
