import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { setCredentials } from '@carto/react-redux';
import { initialState } from 'store/initialStateSlice';
import { useSearchParams } from 'react-router-dom';

const ACCOUNT_FULFILLED_PARAM = 'accountFulfilled';
const buildAccountFulfilledUri = () =>
  `${window.location.origin}?${ACCOUNT_FULFILLED_PARAM}=true`;

export default function useAuth() {
  const { isAuthenticated, getAccessTokenSilently, user, loginWithRedirect } = useAuth0();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const accountsUrl = initialState.accountsUrl;
  const organizationId = initialState.oauth?.organizationId;
  const namespace = initialState.oauth?.namespace;
  
  const accountHasBeenFulfilled = searchParams.has(ACCOUNT_FULFILLED_PARAM);

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
    if (isAuthenticated && userMetadata) {
      getAccessToken();
    } else if (isAuthenticated) {
      if (accountHasBeenFulfilled) {
        // if ACCOUNT_FULFILLED_PARAM is present we have to login again
        // to get a new token with user_metadata properly
        loginWithRedirect();
      } else {
        const searchParams = new URLSearchParams({
          redirectUri: buildAccountFulfilledUri(),
        });
        // Redirect to: accounts-www for signup on cloud-native
        window.location.href = `${redirectAccountUri}?${searchParams}`;
      }
    }
  }, [
    accountHasBeenFulfilled,
    getAccessToken,
    isAuthenticated,
    loginWithRedirect,
    redirectAccountUri,
    userMetadata,
  ]);

  return;
}
