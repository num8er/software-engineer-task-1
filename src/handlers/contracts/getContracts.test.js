const { getContracts } = require('./getContracts');

const mockContracts = [
  {
    id: 1,
    Contractor: { id: 2 },
    Client: { id: 1 },
  },
  {
    id: 2,
    Contractor: { id: 3 },
    Client: { id: 1 },
  },
]

jest.mock('../../repositories', () => ({
  get: () => ({
    getContractsByProfileId: async (id) => {
      if (id === 1) {
        return mockContracts;
      }
      return null;
    },
  }),
}));

describe('handlers/contracts/getContracts', () => {
  it('responds with contract', async () => {
    const req = {
      profile: { id: 1 },
    };

    const res = {
      json: jest.fn(),
    };

    await getContracts(req, res);

    expect(res.json).toHaveBeenCalledWith(mockContracts);
  });

  it('responds with empty array if no contracts by profile', async () => {
    const req = {
      profile: { id: 10 },
    };

    const res = {
      json: jest.fn(),
    };

    await getContracts(req, res);

    expect(res.json).toHaveBeenCalledWith([]);
  });
});