const repositories = require('../../repositories');
const JobsRepository = repositories.get('Jobs');

/**
 * Get unpaid jobs for a user
 *
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {Promise<void>}
 */
async function getUnpaidJobsForUser(req, res) {
  const { profile: { id: profileId } } = req;

  const jobs = await JobsRepository.getUnpaidJobsByProfileId(profileId);

  res.json(jobs);
}

module.exports = {
  getUnpaidJobsForUser,
};
