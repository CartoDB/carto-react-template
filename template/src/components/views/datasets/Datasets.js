import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import { getDatasets } from 'lib/api/Datasets';

import { selectCredentials } from 'config/oauthSlice';

import DatasetsList from './datasets-list/DatasetsList';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  datasetsList: {
    width: '100%',
    maxHeight: 500,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));

function Datasets() {
  const classes = useStyles();
  const credentials = useSelector(selectCredentials);

  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    if (credentials) {
      getDatasets(credentials).then((data) => {
        const cartodbfied = data.filter((dataset) => dataset.cartodbfied);
        setDatasets(cartodbfied);
      });
    } else {
      setDatasets([]);
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
        <Grid item className={classes.datasetsList}>
          <DatasetsList datasets={datasets} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Datasets;
