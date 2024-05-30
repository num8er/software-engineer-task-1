const repositories = require('../../repositories');
const ContractsRepository = repositories.get('Contracts');

/**
 * Get contract by id
 *
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {Promise<*>}
 */
async function getContractById(req, res) {
  const { id: contractId } = req.params;
  const { profile: { id: profileId } } = req;

  const contract = await ContractsRepository.getById(contractId);
  if (!contract) {
    return res.status(404).json({
      message: 'Contract not found',
    });
  }

  if (contract.Contractor.id !== profileId && contract.Client.id !== profileId) {
    return res.status(403).json({
      message: 'Requesting profile does not have access to contract',
    });
  }

  res.json(contract);
}

module.exports = {
  getContractById,
};
