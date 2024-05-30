const req = Object.freeze({
  get: jest.fn((what) => {
    if (what === 'profile_id') {
      return 1;
    }
  })
});

const res = Object.freeze({
  status: jest.fn(
    () => ({
      end: jest.fn(),
    }),
  ),
  end: jest.fn(),
  json: jest.fn(),
});

const next = jest.fn();

module.exports = {
  req,
  res,
  next,
};