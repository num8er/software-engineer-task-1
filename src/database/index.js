const { sequelize } = require('./sequelize');

module.exports = {
  sequelize,
  ...require('./models'),
};
