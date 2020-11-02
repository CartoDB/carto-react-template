import {
  REQUEST_GET_MAX_URL_LENGTH,
  getRequest,
  postRequest,
  encodeParameter,
} from './requestsUtils';

import { dealWithApiError, generateApiUrl, serverUrl } from './common';

const API = 'api/v2/sql';

/**
 * Execute a SQL query
 */
export const executeSQL = async (credentials, query) => {
  let response;

  try {
    console.log(query);
    const request = createRequest({ credentials, query });
    response = await fetch(request);
  } catch (error) {
    throw new Error(`Failed to connect to ${API} API: ${error}`);
  }

  const data = await response.json();

  if (!response.ok) {
    dealWithApiError({ API, credentials, response, data });
  }

  return data.rows; // just rows portion of result object
};

/**
 * Create an 'SQL query' request
 * (using GET or POST request, depending on url size)
 */
function createRequest({ credentials, query }) {
  const encodedApiKey = encodeParameter('api_key', credentials.apiKey);
  const encodedClient = encodeParameter('client', credentials.username);
  const parameters = [encodedApiKey, encodedClient];
  const queryParameter = encodeParameter('q', query);
  const url = generateApiUrl({ API, credentials, parameters });

  const getUrl = `${url}&${queryParameter}`;
  if (getUrl.length < REQUEST_GET_MAX_URL_LENGTH) {
    return getRequest(getUrl);
  }

  return postRequest(url, { q: query });
}
