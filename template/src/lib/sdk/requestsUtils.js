/**
 * Threshold to use GET requests, vs POST
 */
export const REQUEST_GET_MAX_URL_LENGTH = 2048;

/**
 * Simple GET request
 */
export function getRequest(url) {
  return new Request(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
}

/**
 * Simple POST request
 */
export function postRequest(url, payload) {
  return new Request(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: payload,
  });
}

/**
 * Simple encode parameter
 */
export function encodeParameter(name, value) {
  return `${name}=${encodeURIComponent(value)}`;
}
