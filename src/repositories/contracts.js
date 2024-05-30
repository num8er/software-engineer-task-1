const { Op } = require('sequelize');

class ContractsRepository {
  constructor(sequelize) {
    this.sequelize = sequelize;
    this.models = sequelize.models;
  }

  async getById(contractId) {
    return this.models.Contract.findOne({
      where: {
        id: contractId,
      },
      include: [
        {
          association: 'Contractor',
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          association: 'Client',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });
  }

  async getContractsByProfileId(profileId) {
    return this.models.Contract.findAll({
      where: {
        [Op.or]: [
          { ContractorId: profileId },
          { ClientId: profileId },
        ],
      },
      include: [
        {
          association: 'Contractor',
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          association: 'Client',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });
  }
}

module.exports = {
  ContractsRepository,
};
