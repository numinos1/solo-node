const express = require('express');
const chalk = require('chalk');
const getPeople = require('./routes/getPeople');
const getPlanets = require('./routes/getPlanets');

/**
 * Instantiate Express Application
 *
 * @type       {Function}
 */
const app = express();

/**
 * People Route
 */
app.get('/people', getPeople);

/**
 * Planets Route
 */
app.get('/planets', getPlanets);

/**
 * Listen to port 3000
 */
const server = app.listen(3000, () => {
  const { address, port } = server.address();

  console.log(chalk.green('API listening at http://%s:%s'), address, port);
});
