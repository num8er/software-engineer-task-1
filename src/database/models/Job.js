const Sequelize = require('sequelize');
const { sequelize } = require('../sequelize');

class Job extends Sequelize.Model {
}

Job.init(
  {
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    },
    paid: {
      type: Sequelize.BOOLEAN,
      // default: false,
      // for boolean values defaultValue should be used
      defaultValue: false,
      allowNull: false,
    },
    paymentDate: {
      type: Sequelize.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Job',
  },
);

module.exports = { Job };
