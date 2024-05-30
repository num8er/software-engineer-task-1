const repositories = require('../../../repositories');
const ReportsRepository = repositories.get('Reports');

async function getBestClients(req, res) {
  const { start, end, limit } = req.query;

  const bestClients = await ReportsRepository.getBestClients(start, end, limit);

  res.json(bestClients);
}

module.exports = {
  getBestClients,
};
