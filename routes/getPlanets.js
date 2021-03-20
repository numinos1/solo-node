const fetchPlanets = require('../src/fetchPlanets');

/**
 * Fetch All Planets Route
 *
 * @param      {Request}    req           The request object
 * @param      {Response}   res           The resource object
 */
module.exports = async function getPlanets(req, res) {
  res.json(
    await fetchPlanets()
  );
}
