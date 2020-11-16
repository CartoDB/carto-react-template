const DEFAULT_USER_COMPONENT_IN_URL = '{user}';

/**
 * Return more descriptive error from API
 */
export function dealWithApiError({ API, credentials, response, data }) {
  switch (response.status) {
    case 401:
      throw new Error(
        `Unauthorized access to API ${API}: invalid combination of user ('${credentials.username}') and apiKey ('${credentials.apiKey}')`
      );
    case 403:
      throw new Error(
        `Unauthorized access to API ${API}: the provided apiKey('${credentials.apiKey}') doesn't provide access to the requested data`
      );
    default:
      throw new Error(`${JSON.stringify(data.error)}`);
  }
}

/**
 * Generate a valid API url for a request
 * @param {} param0
 */
export function generateApiUrl({ API, credentials, parameters }) {
  const base = `${serverUrl(credentials)}${API}`;

  if (!parameters) {
    return base;
  }

  return `${base}?${parameters.join('&')}`;
}

/**
 * Prepare a url valid for the specified user, from the serverUrlTemplate
 */
function serverUrl(credentials) {
  let url = credentials.serverUrlTemplate.replace(
    DEFAULT_USER_COMPONENT_IN_URL,
    credentials.username
  );

  if (!url.endsWith('/')) {
    url += '/';
  }

  return url;
}
