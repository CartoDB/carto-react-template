import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { setCredentials } from '@carto/react-redux';
import { initialState } from 'store/initialStateSlice';
import { useSearchParams } from 'react-router-dom';

const FORCE_LOGIN_PARAM = 'forceLogin';

export default function useAuth() {
  const { isAuthenticated, getAccessTokenSilently, user, loginWithRedirect } = useAuth0();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const accountsUrl = initialState.accountsUrl;
  const organizationId = initialState.oauth?.organizationId;
  const namespace = initialState.oauth?.namespace;

  const hasForceLogin = searchParams.has(FORCE_LOGIN_PARAM);

  const getAccessToken = useCallback(async () => {
    let accessToken = await getAccessTokenSilently();
    dispatch(setCredentials({ accessToken }));
  }, [dispatch, getAccessTokenSilently]);

  const userMetadata = useMemo(() => {
    if (!user) return;
    return user[`${namespace}user_metadata`];
  }, [user, namespace]);

  const redirectAccountUri = useMemo(() => {
    return `${accountsUrl}${organizationId ? `sso/${organizationId}` : ''}`;
  }, [accountsUrl, organizationId]);

  useEffect(() => {
    if (hasForceLogin) {
      // if FORCE_LOGIN_PARAM is set a relogin is required to refresh userMetadata
      loginWithRedirect();
    } else if (isAuthenticated && userMetadata) {
      getAccessToken();
    } else if (isAuthenticated) {
      // No organizations associated with the user, we need to redirect to app.carto.com to complete the signup process
      const searchParams = new URLSearchParams({
        redirectUri: `${window.location.origin}?${FORCE_LOGIN_PARAM}=true`,
      });
      window.location.href = `${redirectAccountUri}?${searchParams}`;
    }
  }, [
    hasForceLogin,
    getAccessToken,
    isAuthenticated,
    loginWithRedirect,
    redirectAccountUri,
    userMetadata,
  ]);

  return;
}
