const repositories = require('../../repositories');
const ContractsRepository = repositories.get('Contracts');

/**
 * Get user's contracts
 *
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {Promise<void>}
 */
async function getContracts(req, res) {
  const { profile: { id: profileId } } = req;

  const contracts = await ContractsRepository.getContractsByProfileId(profileId) || [];

  res.json(contracts);
}

module.exports = {
  getContracts,
};
