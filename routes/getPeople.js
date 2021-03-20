const fetchPeople = require('../src/fetchPeople');
const sortPeople = require('../src/sortPeople');

/**
 * Fetch All People Route
 *
 * @param      {Request}    req           The request object
 * @param      {String}     req.sortBy    Sort results by name, height, mass
 * @param      {Response}   res           The resource object
 */
module.exports = async function getPeople(req, res) {
  res.json(
    sortPeople(
      await fetchPeople(),
      req.query.sortBy
    )
  );
}
