// API api/v4/datasets

const DEFAULT_USER_COMPONENT_IN_URL = '{user}';

// to avoid pagination
const RESTRICT_TO_PAGES = 1;
const MAX_DATASETS = 1000;

/**
 * Get all datasets in the account, up to MAX_DATASETS.
 * This method doesn't deal with pagination for simplicity
 */
export const getDatasets = async (credentials) => {
  let response;

  try {
    const request = createGetDatasetsRequest(credentials);
    /* global fetch */
    /* eslint no-undef: "error" */
    response = await fetch(request);
  } catch (error) {
    throw new Error(`Failed to connect to Datasets API: ${error}`);
  }

  const data = await response.json();

  if (!response.ok) {
    dealWithApiError({ response, data, credentials });
  }

  return data.result; // no pagination, but raw results
};

/**
 * Display proper message from API error
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
function createGetDatasetsRequest(credentials) {
  const encodedApiKey = encodeParameter('api_key', credentials.apiKey);
  const page = encodeParameter('page', RESTRICT_TO_PAGES);
  const pageSize = encodeParameter('per_page', MAX_DATASETS);
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
 * Prepare a url valid for the specified user
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
  /* global Request */
  /* eslint no-undef: "error" */
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
