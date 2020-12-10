import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useOAuthLogin } from '@carto/react/oauth';
import { setTokenAndUserInfoAsync } from '@carto/react/redux';

import { setError } from 'config/appSlice';

const useStyles = makeStyles((theme) => ({
  containerWrapper: {
    flex: '1 1 auto',
    display: 'flex',
  },
  paperForm: {
    width: theme.spacing(40),
    height: theme.spacing(32),
    padding: theme.spacing(4),
  },
}));

export default function Login() {
  const classes = useStyles();
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
    <Container className={classes.containerWrapper}>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justify='center'
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12}>
          <Paper variant='elevation' elevation={4} className={classes.paperForm}>
            <Grid
              container
              spacing={4}
              direction='column'
              alignItems='center'
              justify='center'
            >
              <Grid item>
                <img src='/logo-primary.svg' alt='CARTO' />
              </Grid>
              <Grid item>
                <Typography>
                  Your credentials are required to login into{' '}
                  <strong>CARTO for React app</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Button color='inherit' variant='outlined' onClick={handleLogin}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
