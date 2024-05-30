const { getProfile } = require('./getProfile');

const { req, res, next } = require('../../test/helpers');

const mockProfile = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
};

jest.mock('../repositories', () => ({
  get: () => ({
    getById: async (id) => {
      if (id === 1) {
        return mockProfile;
      }
      return null;
    },
  }),
}));

describe('middlewares/getProfile', () => {
  it('responds unauthorized if profile_id does not exist', async () => {
    const req = {
      get: jest.fn((what) => {
        if (what === 'profile_id') {
          return 0;
        }
      })
    };

    const res = {
      status: jest.fn(() => {
        return {
          end: jest.fn(),
          json: jest.fn(),
        };
      }),
    };

    await getProfile(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('sets req.profile and calls next', async () => {
    const goodReq = {
      ...req,
      profile: null,
    };

    await getProfile(goodReq, res, next);

    expect(goodReq.profile).not.toBeNull();
    expect(next).toHaveBeenCalled();
  });
});