import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';

import { createOAuthPopup, getOAuthParamsFromCallback } from './oauthHelper';

import { setError, setTokenAndUserInfoAsync } from 'config/oauthSlice';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

function OAuthLogin() {
  const oauthApp = useSelector((state) => state.oauth.oauthApp);
  const classes = useStyles();
  const [popup, setPopup] = useState();
  const intervalRef = useRef();
  const dispatch = useDispatch();

  const clearTimer = () => {
    window.clearInterval(intervalRef.current);
  };

  const handleLogin = async () => {
    setPopup(createOAuthPopup(oauthApp));
  };

  // Based on github.com/kgoedecke/react-oauth-popup/blob/master/src/index.tsx
  useEffect(() => {
    if (popup) {
      intervalRef.current = window.setInterval(() => {
        try {
          const popupUrl = popup.location.href;
          const params = getOAuthParamsFromCallback(popupUrl);
          if (!params) {
            return;
          }

          // save params
          if (params.error) {
            dispatch(setError(params));
          } else {
            dispatch(setTokenAndUserInfoAsync(params));
          }

          clearTimer();
          popup.close(); // done, get rid of the popup
        } catch (popupError) {
          dispatch(
            setError({ error: 'OAuth popup error', errorDescription: popupError.message })
          );
        } finally {
          if (!popup || popup.closed) {
            clearTimer();
          }
        }
      }, 500);
    }
    return () => {
      if (popup) popup.close();
    };
  });

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
