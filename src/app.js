const express = require('express');
const bodyParser = require('body-parser');

const { sequelize } = require('./database');
const { initRepositories } = require('./repositories');
initRepositories(sequelize);

const app = express();

app.use(bodyParser.json());
app.use(require('./routes'));

module.exports = app;
