const { ProfilesRepository } = require('./profiles');
const { ContractsRepository } = require('./contracts');
const { JobsRepository } = require('./jobs');
const { ReportsRepository } = require('./reports');

let repositoryMap = new Map();

function initRepositories(sequelize) {
  repositoryMap = new Map([
    ['Profiles', new ProfilesRepository(sequelize)],
    ['Contracts', new ContractsRepository(sequelize)],
    ['Jobs', new JobsRepository(sequelize)],
    ['Reports', new ReportsRepository(sequelize)],
  ]);
}

module.exports = {
  initRepositories,
  get(repositoryName) {
    return repositoryMap.get(repositoryName);
  },
};
