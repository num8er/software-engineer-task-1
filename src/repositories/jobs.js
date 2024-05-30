const { Op } = require('sequelize');

class JobsRepository {
  constructor(sequelize) {
    this.sequelize = sequelize;
    this.models = sequelize.models;
  }

  async getById(jobId) {
    return this.models.Job.findOne({
      where: {
        id: jobId,
      },
      include: [
        {
          association: 'Contract',
          include: [
            'Contractor',
            'Client',
          ],
        },
      ],
    });
  }

  async getUnpaidJobsByProfileId(profileId) {
    return this.models.Job.findAll({
      where: {
        paid: false,
        '$Contract.status$': {
          [Op.ne]: 'terminated',
        },
        [Op.or]: [
          { '$Contract.Contractor.id$': profileId },
          { '$Contract.Client.id$': profileId },
        ],
      },
      include: [
        {
          association: 'Contract',
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
        },
      ],
    });
  }

  async payForJob(job) {
    const transaction = await this.sequelize.transaction();

    try {
      await Promise.all([
        // charge client
        this.models.Profile.update({
          balance: this.sequelize.literal(`balance - ${job.price}`),
        }, {
          where: {
            id: job.Contract.Client.id,
          },
          transaction,
        }),

        // pay contractor
        this.models.Profile.update({
          balance: this.sequelize.literal(`balance + ${job.price}`),
        }, {
          where: {
            id: job.Contract.Contractor.id,
          },
          transaction,
        }),

        // mark job as paid
        job.update({
          paid: true,
          paymentDate: new Date(),
        }, {
          transaction,
        }),
      ]);

      const client = await this.models.Profile.findByPk(job.Contract.Client.id, { transaction });
      if (client.balance < 0) {
        throw new Error('Client balance is negative, transaction rolled back');
      }

      await transaction.commit();

      return this.getById(job.id);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async totalPayableByProfileId(profileId) {
    const jobs = await this.getUnpaidJobsByProfileId(profileId);
    return jobs.reduce((total, job) => total + job.price, 0);
  }
}

module.exports = {
  JobsRepository,
};
