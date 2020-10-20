import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';

import useOAuthLogin from './useOAuthLogin';
import { setError, setTokenAndUserInfoAsync } from 'config/oauthSlice';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

function OAuthLogin() {
  const oauthApp = useSelector((state) => state.oauth.oauthApp);
  const classes = useStyles();
  const [oauthParams, handleLogin] = useOAuthLogin(oauthApp);

  const dispatch = useDispatch();

  if (oauthParams) {
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
          <Button edge='end' color='inherit' onClick={handleLogin}>
            Login
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default OAuthLogin;
