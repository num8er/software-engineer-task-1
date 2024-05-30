class ProfilesRepository {
  constructor(sequelize) {
    this.sequelize = sequelize;
    this.models = sequelize.models;
  }

  async getById(profileId) {
    return this.models.Profile.findByPk(profileId);
  }

  async depositMoneyIntoBalance(profileId, amount) {
    const transaction = await this.sequelize.transaction();

    try {
      await this.models.Profile.update({
        balance: this.sequelize.literal(`balance + ${amount}`),
      }, {
        where: {
          id: profileId,
        },
        transaction,
      });

      await transaction.commit();

      return this.getById(profileId);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = {
  ProfilesRepository,
};
