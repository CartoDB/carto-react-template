import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, Grid, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { useOAuthLogin } from '@carto/react/oauth';
import { selectOAuthCredentials, setTokenAndUserInfoAsync } from '@carto/react/redux';
import { getUserDatasets } from '@carto/react/api';

import UserDatasets from 'components/views/datasets/UserDatasets';
import { setBottomSheetOpen, setError } from 'config/appSlice';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3, 3, 1.5),

    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(0),
    },
  },

  content: {
    padding: theme.spacing(0, 3, 3),
  },

  alert: {
    marginTop: theme.spacing(2),
  },
}));

// Limit the number of datasets, using just 1 page, up to 50 datasets
const pagination = { page: 1, size: 50 };

function Datasets() {
  const credentials = useSelector(selectOAuthCredentials);
  const oauthApp = useSelector((state) => state.oauth.oauthApp);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    if (credentials) {
      // Get user datasets, once logged in
      setLoading(true);
      getUserDatasets(credentials, { pagination, abortController })
        .then((datasets) => {
          setDatasets(datasets);
          setLoading(false);
        })
        .catch((error) => {
          if (error.name === 'AbortError') return;

          dispatch(setError(`Error loading datasets: ${error.message}`));
        });
    } else {
      dispatch(setBottomSheetOpen(true));
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [credentials, dispatch]);

  const onParamsRefreshed = (oauthParams) => {
    if (oauthParams.error) {
      dispatch(setError(`OAuth error: ${oauthParams.error}`));
    } else {
      dispatch(setTokenAndUserInfoAsync(oauthParams));
    }
  };

  const [handleLogin] = useOAuthLogin(oauthApp, onParamsRefreshed);

  return (
    <Grid container direction='column' justify='flex-start' alignItems='stretch' item xs>
      <Grid item>
        <Typography variant='h5' gutterBottom className={classes.title}>
          Available datasets
        </Typography>
      </Grid>

      <Divider />

      <Grid item xs className={classes.content}>
        {credentials ? (
          <UserDatasets datasets={datasets} loading={loading} />
        ) : (
          <Grid container spacing={2}>
            <Grid item>
              <Alert severity='warning' className={classes.alert}>
                To list your datasets, you have to login first using your CARTO account,
                and authorize the OAuth application
              </Alert>
            </Grid>
            <Grid item xs>
              <Button variant='contained' color='primary' fullWidth onClick={handleLogin}>
                Login
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default Datasets;
