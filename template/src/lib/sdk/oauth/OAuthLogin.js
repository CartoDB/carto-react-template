import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Link } from '@material-ui/core';
import useOAuthLogin from './useOAuthLogin';
import { setTokenAndUserInfoAsync } from 'lib/sdk/slice/oauthSlice';
import { setError } from 'lib/sdk/slice/cartoSlice';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function OAuthLogin() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const oauthApp = useSelector((state) => state.oauth.oauthApp);

  const onParamsRefreshed = (oauthParams) => {
    if (oauthParams.error) {
      dispatch(setError(oauthParams.error));
    } else {
      dispatch(setTokenAndUserInfoAsync(oauthParams));
    }
  };

  const [handleLogin] = useOAuthLogin(oauthApp, onParamsRefreshed);

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
