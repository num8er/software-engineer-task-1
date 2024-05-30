const repositories = require('../../../repositories');
const ReportsRepository = repositories.get('Reports');

async function getBestProfession(req, res) {
  const { start, end } = req.query;

  const bestProfession = await ReportsRepository.getBestProfession(start, end);

  res.json(bestProfession);
}

module.exports = {
  getBestProfession,
};
