import { getRequest, encodeParameter } from '../utils';
import { dealWithApiError, generateApiUrl } from './common';

const API = 'api/v4/datasets';

/**
 * Get the datasets list
 */
export const getUserDatasets = async (
  credentials,
  pagination = { page: 1, size: 100 }
) => {
  let response;

  try {
    const request = createRequest({ credentials, pagination });
    response = await fetch(request);
  } catch (error) {
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
function createRequest({ credentials, pagination }) {
  const encodedApiKey = encodeParameter('api_key', credentials.apiKey);
  const page = encodeParameter('page', pagination.page);
  const pageSize = encodeParameter('per_page', pagination.size);
  const parameters = [encodedApiKey, page, pageSize];
  const url = generateApiUrl({ API, credentials, parameters });

  return getRequest(url);
}
