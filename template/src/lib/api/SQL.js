import { encodeParameter, getRequest, postRequest } from '../utils';
import { REQUEST_GET_MAX_URL_LENGTH } from '../utils';

import { dealWithApiError, generateApiUrl } from './common';

const API = 'api/v2/sql';

/**
 * Execute a SQL query
 */
export const executeSQL = async (credentials, query, opts = {}) => {
  let response;

  try {
    const request = createRequest({ credentials, query, opts });
    response = await fetch(request);
  } catch (error) {
    if (error.name === 'AbortError') throw error;

    throw new Error(`Failed to connect to ${API} API: ${error}`);
  }

  const data = await response.json();

  if (!response.ok) {
    dealWithApiError({ API, credentials, response, data });
  }

  return opts && opts.format === 'geojson' ? data : data.rows; // just rows portion of result object
};

/**
 * Create an 'SQL query' request
 * (using GET or POST request, depending on url size)
 */
function createRequest({ credentials, query, opts }) {
  const { abortController, ...otherOptions } = opts;

  const rawParams = {
    api_key: credentials.apiKey,
    client: credentials.username,
    q: query.trim(),
    ...otherOptions,
  };

  const requestOpts = { ...otherOptions };
  if (abortController) {
    requestOpts['signal'] = abortController.signal;
  }

  // Get request
  const encodedParams = Object.entries(rawParams).map(([key, value]) =>
    encodeParameter(key, value)
  );
  const getUrl = generateApiUrl({ API, credentials, parameters: encodedParams });
  if (getUrl.length < REQUEST_GET_MAX_URL_LENGTH) {
    return getRequest(getUrl, requestOpts);
  }

  // Post request
  const postUrl = generateApiUrl({ API, credentials });
  return postRequest(postUrl, rawParams, requestOpts);
}
