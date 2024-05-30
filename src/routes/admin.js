const express = require('express');
const router = express.Router();

const { getBestProfession } = require('../handlers/admin/reporting/getBestProfession');
const { getBestClients } = require('../handlers/admin/reporting/getBestClients');

router.get('/best-profession', getBestProfession);
router.get('/best-clients', getBestClients);

module.exports = router;
