const express = require('express');
const router = express.Router();

const { getProfile } = require('../middleware/getProfile');

const { getContracts } = require('../handlers/contracts/getContracts');
const { getContractById } = require('../handlers/contracts/getContractById');

router.use(getProfile);
router.get('/', getContracts);
router.get('/:id', getContractById);

module.exports = router;
