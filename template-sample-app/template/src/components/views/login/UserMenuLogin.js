import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Hidden, IconButton } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { useOAuthLogin } from '@carto/react/oauth';
import { setTokenAndUserInfoAsync } from '@carto/react/redux';

import { setError } from 'config/appSlice';

/**
 * Shows a login button.
 * When this button is clicked, the OAuth protocol flow is handled
 * by the `useOAuthLogin` hook.
 *
 * @exports OAuthLogin
 */
export default function UserMenuLogin() {
  const dispatch = useDispatch();
  const oauthApp = useSelector((state) => state.oauth.oauthApp);

  const onParamsRefreshed = (oauthParams) => {
    if (oauthParams.error) {
      dispatch(setError(`OAuth error: ${oauthParams.error}`));
    } else {
      dispatch(setTokenAndUserInfoAsync(oauthParams));
    }
  };

  const [handleLogin] = useOAuthLogin(oauthApp, onParamsRefreshed);

  return (
    <>
      <Hidden xsDown>
        <Button color='inherit' variant='outlined' onClick={handleLogin}>
          Login
        </Button>
      </Hidden>
      <Hidden smUp>
        <IconButton color='inherit' aria-label='Login' onClick={handleLogin}>
          <AccountCircleOutlinedIcon />
        </IconButton>
      </Hidden>
    </>
  );
}
