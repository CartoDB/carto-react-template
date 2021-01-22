import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { selectOAuthCredentials } from '@carto/react/redux';
import { getUserDatasets } from '@carto/react/api';

import UserDatasets from 'components/views/datasets/UserDatasets';
import { setError } from 'config/appSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5),
    margin: 0,

    '& h5': {
      marginBottom: 0,
    },
  },
}));

// Limit the number of datasets, using just 1 page, up to 50 datasets
const pagination = { page: 1, size: 50 };

function Datasets() {
  const credentials = useSelector(selectOAuthCredentials);
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
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [credentials, dispatch]);

  // Auto import useEffect

  return (
    <Grid
      container
      direction='column'
      justify='flex-start'
      alignItems='stretch'
      spacing={3}
      className={classes.root}
      item
      xs
    >
      <Grid item>
        <Typography variant='h5' gutterBottom>
          Available datasets
        </Typography>
      </Grid>

      <Grid item xs>
        {credentials ? (
          <UserDatasets datasets={datasets} loading={loading} />
        ) : (
          <Alert severity='warning'>
            To list your datasets, you have to login first using your CARTO account, and
            authorize the OAuth application
          </Alert>
        )}
      </Grid>
    </Grid>
  );
}

export default Datasets;
