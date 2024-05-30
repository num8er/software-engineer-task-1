const express = require('express');
const router = express.Router();

const { depositMoneyIntoUserBalance } = require('../handlers/balances/depositMoneyIntoUserBalance');

router.post('/deposit/:userId', depositMoneyIntoUserBalance);

module.exports = router;
