import { encodeParameter, getRequest } from '../utils';
import { dealWithApiError, generateApiUrl } from './common';

const API = 'api/v4/datasets';

/**
 * Get the datasets list
 */
export const getUserDatasets = async (credentials, opts = {}) => {
  let response;

  if (!opts.pagination) {
    opts.pagination = { page: 1, size: 100 };
  }

  try {
    const request = createRequest({ credentials, opts });
    response = await fetch(request);
  } catch (error) {
    if (error.name === 'AbortError') throw error;

    throw new Error(`Failed to connect to ${API} API: ${error}`);
  }

  let data = await response.json();

  if (!response.ok) {
    dealWithApiError({ API, credentials, response, data });
  }

  // only cartodbfied and user datasets
  return data.result.filter(
    (d) => d.cartodbfied && d.table_schema === credentials.username
  );
};

/**
 * Create a 'Get all datasets' request
 * (using GET)
 */
function createRequest({ credentials, opts }) {
  const { pagination, abortController, ...otherOptions } = opts;

  const encodedApiKey = encodeParameter('api_key', credentials.apiKey);
  const page = encodeParameter('page', pagination.page);
  const pageSize = encodeParameter('per_page', pagination.size);
  const parameters = [encodedApiKey, page, pageSize];
  const url = generateApiUrl({ API, credentials, parameters });

  const requestOpts = { ...otherOptions };
  if (abortController) {
    requestOpts['signal'] = abortController.signal;
  }

  return getRequest(url, requestOpts);
}
