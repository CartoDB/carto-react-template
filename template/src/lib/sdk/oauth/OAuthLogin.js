import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Link } from '@material-ui/core';

import useOAuthLogin from './useOAuthLogin';
import { setError, setTokenAndUserInfoAsync } from 'config/oauthSlice';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

function OAuthLogin() {
  const oauthApp = useSelector((state) => state.oauth.oauthApp);
  const [handleLogin] = useOAuthLogin(oauthApp, onParamsRefreshed);

  const dispatch = useDispatch();
  const classes = useStyles();

  function onParamsRefreshed(oauthParams) {
    if (oauthParams.error) {
      dispatch(setError(oauthParams));
    } else {
      dispatch(setTokenAndUserInfoAsync(oauthParams));
    }
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        justify='flex-end'
        alignItems='center'
        spacing={1}
        style={{ flexGrow: 1 }}
      >
        <Grid item>
          <Link component='button' color='inherit' onClick={handleLogin}>
            Login
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default OAuthLogin;
