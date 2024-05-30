const { getContractById } = require('./getContractById');

const mockContract = {
  id: 1,
  Contractor: { id: 2 },
  Client: { id: 1 },
};

jest.mock('../../repositories', () => ({
  get: () => ({
    getById: async (id) => {
      if (id === 1) {
        return mockContract;
      }
      return null;
    },
  }),
}));

describe('handlers/contracts/getContractById', () => {
  it('responds with contract', async () => {
    const req = {
      params: { id: 1 },
      profile: { id: 1 },
    };

    const res = {
      json: jest.fn(),
    };

    await getContractById(req, res);

    expect(res.json).toHaveBeenCalledWith(mockContract);
  });

  it('responds with 404 if contract not found', async () => {
    const req = {
      params: { id: 2 },
      profile: { id: 1 },
    };

    const res = {
      status: jest.fn(() => {
        return { json: jest.fn() };
      }),
    };

    await getContractById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});