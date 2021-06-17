import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { setCredentials } from '@carto/react-redux';
import Login from 'components/views/login/Login';

function Auth0({ children }) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.carto.credentials.accessToken);
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const getAccessToken = async () => {
        let accessToken = await getAccessTokenSilently();
        dispatch(setCredentials({ accessToken }));
      };
      getAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated, dispatch]);

  const showLoading = isLoading || (isAuthenticated && !accessToken);

  return (
    <>
      {showLoading && <p>Loading</p>}
      {!showLoading && !isAuthenticated && <Login />}
      {accessToken && children}
    </>
  );
}

export default Auth0;
