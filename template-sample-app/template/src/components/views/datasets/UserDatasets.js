import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setOAuthApp,
  setTokenAndUserInfoAsync,
  selectOAuthCredentials,
  addLayer,
  addSource,
  removeLayer,
  removeSource,
} from '@carto/react/redux';
import { useOAuthLogin } from '@carto/react/oauth';

import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { ChevronRight, HighlightOff } from '@material-ui/icons';
import { setBottomSheetOpen, setError } from 'config/appSlice';

const useStyles = makeStyles((theme) => ({
  loadingSpinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
}));

const scopeForDataset = (dataset) => {
  return `datasets:r:${dataset.table_schema}.${dataset.name}`;
};

const toTitleCase = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default function UserDatasets(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  // Redux
  const { oauthLayer } = useSelector((state) => state.carto.layers);
  const credentials = useSelector(selectOAuthCredentials);
  const oauthApp = useSelector((state) => state.oauth.oauthApp);
  const token = useSelector((state) => state.oauth.token);
  // Local states
  const [dataset, setDataset] = useState(null);
  const [newTokenRequest, setNewTokenRequest] = useState(false);
  const [initialToken, setInitialToken] = useState(null);

  // Load dataset & layer to store (so to Map)
  const loadDataset = useCallback(
    (selectedDataset) => {
      const { name: datasetName, table_schema: schema } = selectedDataset;
      const dataSourceCredentials = { ...credentials };

      dispatch(
        addSource({
          id: 'oauthSource',
          data: `SELECT * FROM "${schema}".${datasetName}`,
          credentials: dataSourceCredentials,
        })
      );

      dispatch(addLayer({ id: 'oauthLayer', source: 'oauthSource', name: datasetName }));
    },
    [credentials, dispatch]
  );

  // Remove dataset & layer from store (so from Map)
  const removeDataset = useCallback(() => {
    dispatch(removeLayer('oauthLayer'));
    dispatch(removeSource('oauthSource'));
  }, [dispatch]);

  const oauthUpdatedFor = useCallback(
    (dataset) => {
      return oauthApp.scopes.includes(scopeForDataset(dataset));
    },
    [oauthApp]
  );

  const authorizeAndLoadDataset = (selectedDataset) => {
    if (oauthUpdatedFor(selectedDataset)) {
      loadDataset(selectedDataset);
    } else {
      setDataset(selectedDataset); // start the process..., monitored during useEffects
      setNewTokenRequest(true);
      setInitialToken(token);
    }
    dispatch(setBottomSheetOpen(false));
  };

  const onParamsRefreshed = (oauthParams) => {
    if (oauthParams.error) {
      dispatch(setError(oauthParams.error));
    } else {
      dispatch(setTokenAndUserInfoAsync(oauthParams));
    }
  };

  const [handleLogin] = useOAuthLogin(oauthApp, onParamsRefreshed);

  // cleanup when leaving
  useEffect(() => removeDataset, [removeDataset]);

  useEffect(() => {
    if (dataset && newTokenRequest && !oauthUpdatedFor(dataset)) {
      // step 1: require a new OAuth process, including the scope for the dataset
      const newScopes = new Set(
        (oauthApp.scopes ? [...oauthApp.scopes] : []).concat(scopeForDataset(dataset))
      );

      const newOAuth = { ...oauthApp, scopes: [...newScopes] };
      dispatch(setOAuthApp(newOAuth));
    }
  });

  useEffect(() => {
    if (dataset && newTokenRequest && oauthUpdatedFor(dataset)) {
      // step 2: login again, once that the new scopes are ready (including the desired datasets)
      handleLogin();
      setNewTokenRequest(false);
    }
  }, [dataset, newTokenRequest, oauthUpdatedFor, handleLogin]);

  useEffect(() => {
    const tokenHasBeenRefreshed = token !== initialToken;
    if (dataset && oauthUpdatedFor(dataset) && tokenHasBeenRefreshed) {
      // step 3: load dataset, once there is a new token that includes its access
      loadDataset(dataset);
      setDataset(null); // ...and finish the process for this dataset
      setInitialToken(null);
    }
  }, [dataset, oauthUpdatedFor, token, initialToken, loadDataset]);

  // Loading...
  if (props.loading) {
    return (
      <Grid container alignItems='center'>
        <Grid item className={classes.loadingSpinner}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  // No datasets
  if (props.datasets.length === 0) {
    return <Typography>No datasets available...</Typography>;
  }

  return (
    <List component='nav' disablePadding={true}>
      {props.datasets.map((dataset) => {
        const labelId = `checkbox-list-label-${dataset.name}`;
        const datasetLoaded = oauthLayer && oauthLayer.name === dataset.name;
        const secondary = toTitleCase(`${dataset.privacy}`);

        return (
          <ListItem
            key={dataset.name}
            divider
            dense
            button
            role={undefined}
            onClick={() =>
              datasetLoaded ? removeDataset() : authorizeAndLoadDataset(dataset)
            }
          >
            <ListItemText id={labelId} primary={dataset.name} secondary={secondary} />
            {datasetLoaded ? (
              <HighlightOff color='primary' />
            ) : (
              <ChevronRight color='primary' />
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
