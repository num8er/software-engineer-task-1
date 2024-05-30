const repositories = require('../../repositories');
const JobsRepository = repositories.get('Jobs');

async function payJobById(req, res) {
  const { id: jobId } = req.params;
  const { profile: { id: profileId } } = req;

  const job = await JobsRepository.getById(jobId);

  if (!job) {
    return res.status(404).json({
      message: 'Job not found',
    });
  }

  if (job.Contract.Client.id !== profileId) {
    return res.status(403).json({
      message: 'Requesting profile is not client to pay for the job',
    });
  }

  if (job.status === 'terminated') {
    return res.status(400).json({
      message: 'Job is terminated',
    });
  }

  if (job.paid) {
    return res.status(400).json({
      message: 'Job already paid',
    });
  }

  if (job.price > job.Contract.Client.balance) {
    return res.status(400).json({
      message: 'Client does not have enough balance to pay for the job',
    });
  }

  try {
    const paidJob = await JobsRepository.payForJob(job);
    res.json(paidJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Failed to pay for the job',
    });
  }
}

module.exports = {
  payJobById,
};
