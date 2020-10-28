// API api/v4/datasets
const DEFAULT_USER_COMPONENT_IN_URL = '{user}';

/**
 * Get the datasets in the account.
 */
export const getDatasets = async (credentials, pagination = { page: 1, size: 100 }) => {
  let response;

  try {
    const request = createGetDatasetsRequest(credentials, pagination);
    response = await fetch(request);
  } catch (error) {
    throw new Error(`Failed to connect to Datasets API: ${error}`);
  }

  const data = await response.json();

  if (!response.ok) {
    dealWithApiError({ response, data, credentials });
  }

  return data; // full object, useful for pagination (.result property has the raw content)
};

/**
 * Return proper error from API
 */
function dealWithApiError({ response, data, credentials }) {
  switch (response.status) {
    case 401:
      throw new Error(
        `Unauthorized access to Datasets API: invalid combination of user ('${credentials.username}') and apiKey ('${credentials.apiKey}')`
      );
    default:
      throw new Error(`${JSON.stringify(data.error)}`);
  }
}

/**
 * Create a GET request, with all required parameters
 */
function createGetDatasetsRequest(credentials, pagination) {
  const encodedApiKey = encodeParameter('api_key', credentials.apiKey);
  const page = encodeParameter('page', pagination.page);
  const pageSize = encodeParameter('per_page', pagination.size);
  const parameters = [encodedApiKey, page, pageSize];

  const url = generateDatasetsApiUrl(parameters, credentials);
  return getRequest(url);
}

/**
 * Generate a Datasets API url for the request
 */
function generateDatasetsApiUrl(parameters, credentials) {
  let base = credentials.serverUrl ?? serverURL(credentials);
  if (!base.endsWith('/')) {
    base += '/';
  }
  const url = `${base}api/v4/datasets`;
  return `${url}?${parameters.join('&')}`;
}

/**
 * Prepare a url valid for the specified user, from the serverUrlTemplate
 */
function serverURL(credentials) {
  let url = credentials.serverUrlTemplate.replace(
    DEFAULT_USER_COMPONENT_IN_URL,
    credentials.username
  );
  return url;
}

/**
 * Simple GET request
 */
function getRequest(url) {
  return new Request(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
}

/**
 * Simple encode parameter
 */
function encodeParameter(name, value) {
  return `${name}=${encodeURIComponent(value)}`;
}
