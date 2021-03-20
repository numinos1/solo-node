const axios = require('axios');
const Bottleneck = require('bottleneck');

/**
 * Limit number of concurrent connections
 *
 * @type       {number}
 */
const MAX_CONNCURENT_CONNECTIONS = 10;

/**
 * Limit number of requests per second
 *
 * @type       {number}
 */
const REQUESTS_PER_SECOND = 20;

/**
 * Maximum number of failed retries per get
 *
 * @type       {number}
 */
const MAX_FAILED_RETRIES = 2;

/**
 * Number of millisecond timeout on retry
 *
 * @type       {number}
 */
const RETRY_TIMEOUT_MILLISECONDS = 100;

/**
 * Create the bottlneck limiter
 *
 * @type       {Bottleneck}
 */
const limiter = new Bottleneck({
  maxConcurrent: MAX_CONNCURENT_CONNECTIONS,
  minTime: (1000 / REQUESTS_PER_SECOND)
});

/**
 * Handle failed requests
 *
 * Note: Could make this more intelligent by
 *       checking for error response codes.
 */
limiter.on('failed', async (error, jobInfo) => {
  if (jobInfo.retryCount < MAX_FAILED_RETRIES) {
    return RETRY_TIMEOUT_MILLISECONDS;
  }
});

/**
 * Create Limited HTTP get function
 *
 * Note: Ensure the URI is secure. For some reason
 *       the resident uri's are not secure!
 *
 * @type       {Function}
 */
const limitedGet = limiter.wrap(uri => {
  const safeURI = uri.replace(/^http:/, 'https:');

  return axios.get(safeURI);
});

/**
 * Export the limited getter
 */
module.exports = limitedGet;
