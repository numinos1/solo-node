const fetchSWAPI = require('./fetchSWAPI');

/**
 * Fetch all People from SWAPI
 *
 * Note: I fetch planet pages sequentially using the provided
 *       API links. I could optimistically load pages concurrently.
 *       That would be a lot faster, but the assignment said to
 *       "use pagination", so I did.
 *
 * Note: All SWAPI API calls proxy through bottlenecK for
 *       rate limiting and error handling. This wasn't specified in
 *       the assignment, but I consider it a "best practice" when
 *       calling 3rd party APIs, so I threw it in.
 *
 * @return     {Array}  All people results
 */
module.exports = async function fetchPeople() {
  let pageUrl = 'https://swapi.dev/api/people';
  let people = [];

  while (pageUrl) {
    const { data } = await fetchSWAPI(pageUrl);

    people = people.concat(data.results);
    pageUrl = data.next;
  }

  return people;
}
