const repositories = require('../../repositories');
const ProfilesRepository = repositories.get('Profiles');
const JobsRepository = repositories.get('Jobs');

async function depositMoneyIntoUserBalance(req, res) {
  const { userId } = req.params;
  const { amount } = req.body;

  const user = await ProfilesRepository.getById(userId);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  if (amount <= 0) {
    return res.status(400).json({
      message: 'Amount should be greater than 0',
    });
  }

  const totalPayable = await JobsRepository.totalPayableByProfileId(userId);
  const canDeposit = amount <= totalPayable * 0.25;
  if (!canDeposit) {
    return res.status(400).json({
      totalPayable,
      amount,
      message: 'Amount should be less than 25% of total unpaid jobs',
    });
  }

  try {
    const updatedUser = await ProfilesRepository.depositMoneyIntoBalance(userId, amount);
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Failed to deposit money into user balance',
    });
  }
}

module.exports = {
  depositMoneyIntoUserBalance,
};
