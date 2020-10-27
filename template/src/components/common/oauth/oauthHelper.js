import { randomString } from 'components/utils';

/**
 * Get a new popup to start the OAuth flow with CARTO
 */
export function createOAuthPopup(oauthApp) {
  // inspired on https://github.com/mattmazzola/react-simple-auth/blob/master/src/react-simple-auth.ts
  const [width, height] = [500, 650]; // proper size for CARTO login
  const windowOptions = {
    width,
    height,
    left:
      Math.floor(window.screen.width / 2 - width / 2) + (window.screen.availLeft || 0),
    top: Math.floor(window.screen.height / 2 - height / 2),
  };

  const oauthAuthorizeUrl = buildAuthorizeUrl(oauthApp);
  const windowOptionString = Object.entries(windowOptions)
    .map(([key, value]) => `${key}=${value}`)
    .join(',');

  const loginWindow = window.open(oauthAuthorizeUrl, '', windowOptionString);
  return loginWindow;
}

/**
 * Extract oauth response from callback url
 */
export function getOAuthParamsFromCallback(url) {
  // response comes in a hash, like
  // https://localhost:3000/oauthCallback#thisIsTheResponse
  const urlUtil = new URL(url.replace('#', '?'));
  const params = new URLSearchParams(urlUtil.search.slice(1));

  const error = params.get('error');
  if (error) {
    // OAuth error
    // an error example: https://localhost:3000/oauthCallback#error=invalid_scope&error_description=Unsupported+scopes%3A+whatever&state=m8p81d13f
    return {
      error,
      errorDescription: params.get('error_description'),
    };
  }

  const accessToken = params.get('access_token');
  if (accessToken) {
    // OAuth success
    // a success example: "https://localhost:3000/oauthCallback#access_token=abcdefghijxxxxxxx&token_type=Bearer&expires_in=3599.915738379&user_info_url=https%3A%2F%2Fpublic.carto.com%2Fapi%2Fv4%2Fme&state=GJ2w6pcsrHRAwIJE"
    const userInfoUrl = params.get('user_info_url');
    const expiresIn = params.get('expires_in');
    const expirationDate = Date.now() + expiresIn * 1000;
    return {
      accessToken,
      expirationDate,
      userInfoUrl,
    };
  }

  return; // indeterminate
}

/**
 * Prepare the url for the OAuth authorization request
 */
function buildAuthorizeUrl({ clientId, scopes, authorizeEndPoint }) {
  const state = randomString(16);
  const scope = encodeURIComponent(scopes.join(' '));

  return `${authorizeEndPoint}?client_id=${clientId}&response_type=token&state=${state}&scope=${scope}`;
}

/**
 * Prepare the url for an OAuth token renewal
 */
export function buildTokenRenewalUrl(oauthApp) {
  let base = buildAuthorizeUrl(oauthApp);
  return `${base}&prompt=none`;
}
