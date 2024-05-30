const repositories = require('../repositories');
const ProfileRepository = repositories.get('Profiles');

const getProfile = async(req, res, next) => {
  const profileId = req.get('profile_id') || 0;
  const profile = await ProfileRepository.getById(profileId);

  if (!profile) return res.status(401).end();
  req.profile = profile;
  next();
};

module.exports = { getProfile };
