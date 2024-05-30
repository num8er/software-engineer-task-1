class ReportsRepository {
  constructor(sequelize) {
    this.sequelize = sequelize;
    this.models = sequelize.models;
  }

  async getBestClients(startDate, endDate, limit) {
    const query = `
      SELECT
        Profiles.id,
        Profiles.firstName,
        Profiles.lastName,
        SUM(J.price) as totalAmount
      FROM Profiles
        INNER JOIN Contracts C on Profiles.id = C.ClientId
        INNER JOIN Jobs J on C.id = J.ContractId
      WHERE
        (J.paymentDate BETWEEN :startDate AND :endDate) AND
        J.paid = 1
      GROUP BY Profiles.id
      ORDER BY totalAmount DESC
      LIMIT :limit
    `;

    const result = await this.sequelize.query(query, {
      replacements: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        limit,
      },
      type: this.sequelize.QueryTypes.SELECT,
    });

    return result;
  }

  async getBestProfession(startDate, endDate) {
    const query = `
      SELECT 
        P.profession,
        SUM(J.price) as totalPayment
      FROM Jobs as J
        INNER JOIN Contracts C on C.id = J.ContractId
        INNER JOIN Profiles P on P.id = C.ContractorId
      WHERE (J.paymentDate BETWEEN :startDate AND :endDate)
        AND J.paid = 1
      GROUP BY P.profession
      ORDER BY totalPayment DESC
      LIMIT 1;
    `;

    const result = await this.sequelize.query(query, {
      replacements: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
      type: this.sequelize.QueryTypes.SELECT,
    });

    return result[0];
  }
}

module.exports = {
  ReportsRepository,
};
