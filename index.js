const express = require('express');
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
app.listen(3000);
