const fetchSWAPI = require('./fetchSWAPI');
const { produce } = require('immer');
const pMap = require('p-map');

/**
 * Fetch all Planets from SWAPI
 *
 * Note: I fetch planet pages sequentially using the provided
 *       API links. I could optimistically load pages concurrently.
 *       That would be a lot faster, but the assignment said to
 *       "use pagination", so I did.
 *
 * Note: I fetch residents concurrently in the background to minimize
 *       loading latency.
 *
 * Note: All SWAPI API calls proxy through bottlenecK for
 *       rate limiting and error handling. This wasn't specified in
 *       the assignment, but I consider it a "best practice" when
 *       calling 3rd party APIs, so I threw it in.
 *
 * @return     {Array}  All planet records
 */
module.exports = async function fetchPlanets() {
  let pageUrl = 'https://swapi.dev/api/planets';
  let planets = [];

  while (pageUrl) {
    const { data } = await fetchSWAPI(pageUrl);

    planets = planets.concat(
      data.results.map(fetchPlanetResidents)
    );
    pageUrl = data.next;
  }

  return Promise.all(planets);
}

/**
 * Concurrently fetch residents for a planet
 *
 * Note: I use immmer to set the residents property of a
 *       planet. I could have modified it in-place or used
 *       a spread operator to accomplish the same thing.
 *
 * @param      {Object}  planet  Planet record
 */
function fetchPlanetResidents(planet) {
  return produce(planet, async (draft) => {
    draft.residents = await pMap(
      planet.residents,
      fetchResidentName
    );
  });
}

/**
 * Fetch a single resident name for a resident URI
 *
 * @param      {String}   residentUrl  The resident url
 * @return     {Promise}  The resident name
 */
async function fetchResidentName(residentUri) {
  const result = await fetchSWAPI(residentUri);

  return result.data.name;
}

