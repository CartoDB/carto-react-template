import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import { getDatasets } from 'lib/sdk';

import useOAuthLogin from 'components/common/oauth/useOAuthLogin';
import {
  setOAuthApp,
  setTokenAndUserInfoAsync,
  setError,
  selectCredentials,
} from 'config/oauthSlice';

import DatasetsList from './datasets-list/DatasetsList';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  datasetsNotAvailable: {
    border: '0.5px solid',
    color: theme.palette.warning.main,
    padding: 20,
  },
  datasetsList: {
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));

// Limit the number of datasets, using just 1 page, up to 50 datasets
const datasetsPagination = { page: 1, size: 50 };

function Datasets() {
  const credentials = useSelector(selectCredentials);
  const oauthApp = useSelector((state) => state.oauth.oauthApp);

  // const [oauth, setOauth] = useState(oauthApp);
  const [handleLogin] = useOAuthLogin(oauthApp, onParamsRefreshed);

  const dispatch = useDispatch();
  const classes = useStyles();

  const [datasets, setDatasets] = useState([]);
  const [extraPermissionRequired, setExtraPermissionRequired] = useState(true);

  const getDataSetScopes = useCallback(() => {
    const datasetScopes = datasets.map(
      (dataset) => `datasets:r:${dataset.table_schema}.${dataset.name}`
    );
    return datasetScopes;
  }, [datasets]);

  useEffect(() => {
    if (credentials) {
      // Get datasets, once logged in
      getDatasets(credentials, datasetsPagination).then((data) => {
        // just cartodbfied datasets can be loaded as deckgl layers with CartoSQLLayers...
        const cartodbfied = data.result.filter(
          (dataset) =>
            dataset.cartodbfied && dataset.table_schema === credentials.username
        );
        setDatasets(cartodbfied);
      });
    }
  }, [credentials]);

  // temporary. Once we have r:* scope, this and next effect won't be necessary
  useEffect(() => {
    if (datasets.length > 0 && extraPermissionRequired) {
      // Require extra permissions to load each dataset
      const upToDateScopes = new Set(
        (oauthApp.scopes ? [...oauthApp.scopes] : []).concat(getDataSetScopes())
      );

      const newOAuth = { ...oauthApp, scopes: [...upToDateScopes] };
      dispatch(setOAuthApp(newOAuth));
    }
  });

  // temporary.
  useEffect(() => {
    const oauthAlreadyUpdated = getDataSetScopes().every((s) =>
      oauthApp.scopes.includes(s)
    );
    if (datasets.length > 0 && extraPermissionRequired && oauthAlreadyUpdated) {
      // Handle a new popup window to authorize reading the datasets
      handleLogin();
      setExtraPermissionRequired(false);
    }
  }, [
    getDataSetScopes,
    datasets.length,
    extraPermissionRequired,
    oauthApp.scopes,
    handleLogin,
  ]);

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
          <Grid item className={classes.datasetsList}>
            <DatasetsList datasets={datasets} />
          </Grid>
        ) : (
          <Typography className={classes.datasetsNotAvailable}>
            To see a list of datasets, you have to login first using your CARTO account
          </Typography>
        )}
      </Grid>
    </div>
  );
}

export default Datasets;
