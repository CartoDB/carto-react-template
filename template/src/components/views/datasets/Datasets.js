import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { getUserDatasets } from 'lib/api';
import { selectOAuthCredentials } from 'config/oauthSlice';
import UserDatasets from 'components/views/datasets/UserDatasets';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  datasetsNotAvailable: {
    border: '0.5px solid',
    color: theme.palette.warning.main,
    padding: 20,
  },
  datasetList: {
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));

// Limit the number of datasets, using just 1 page, up to 50 datasets
const datasetsPagination = { page: 1, size: 50 };

function Datasets() {
  const credentials = useSelector(selectOAuthCredentials);
  const classes = useStyles();
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (credentials) {
      // Get user datasets, once logged in
      setLoading(true);
      getUserDatasets(credentials, datasetsPagination).then((datasets) => {
        setDatasets(datasets);
        setLoading(false);
      });
    }
  }, [credentials]);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='column'
        justify='flex-start'
        alignItems='flex-start'
        spacing={2}
      >
        <Grid item>
          <Typography variant='h5' gutterBottom>
            Available datasets
          </Typography>
        </Grid>

        {credentials ? (
          <Grid item className={classes.datasetList}>
            <UserDatasets datasets={datasets} loading={loading} />
          </Grid>
        ) : (
          <Typography className={classes.datasetsNotAvailable}>
            To list your datasets, you have to login first using your CARTO account, and
            authorize the OAuth application
          </Typography>
        )}
      </Grid>
    </div>
  );
}

export default Datasets;
