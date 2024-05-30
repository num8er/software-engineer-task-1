const express = require('express');
const router = express.Router();

const { getProfile } = require('../middleware/getProfile');

const { getUnpaidJobsForUser } = require('../handlers/jobs/getUnpaidJobsForUser');
const { payJobById } = require('../handlers/jobs/payJobById');

router.use(getProfile);
router.get('/unpaid', getUnpaidJobsForUser);
router.post('/:id/pay', payJobById);

module.exports = router;
