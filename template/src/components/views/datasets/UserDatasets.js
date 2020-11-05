import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addLayer, addSource, removeLayer, removeSource } from 'config/cartoSlice';
import {
  setOAuthApp,
  setTokenAndUserInfoAsync,
  setError,
  selectOAuthCredentials,
} from 'config/oauthSlice';
import useOAuthLogin from 'lib/sdk/oauth/useOAuthLogin';
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { ChevronRight, HighlightOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  loadingSpinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  dataset: {
    maxWidth: '100%',
  },
  datasetName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const scopeForDataset = (dataset) => {
  return `datasets:r:${dataset.table_schema}.${dataset.name}`;
};

export default function UserDatasets(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  // Redux
  const { oauthLayer } = useSelector((state) => state.carto.layers);
  const credentials = useSelector(selectOAuthCredentials);
  const oauthApp = useSelector((state) => state.oauth.oauthApp);
  const token = useSelector((state) => state.oauth.token);
  // Local states
  const [datasetRequiresOAuth, setDatasetRequiresOAuth] = useState(null);
  const [oauthRequired, setOauthRequired] = useState(false);
  const [initialToken, setInitialToken] = useState(null);

  // Load dataset & layer to store (so to Map)
  const loadDataset = useCallback(
    (selectedDataset) => {
      const { name: datasetName, table_schema: schema } = selectedDataset;
      const dataSourceCredentials = { ...credentials, username: schema };

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
  const removeDataset = () => {
    dispatch(removeSource('oauthSource'));
    dispatch(removeLayer('oauthLayer'));
  };

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
      setDatasetRequiresOAuth(selectedDataset); // start the process..., monitored during useEffects
      setOauthRequired(true);
      setInitialToken(token);
    }
  };

  const onParamsRefreshed = (oauthParams) => {
    if (oauthParams.error) {
      dispatch(setError(oauthParams));
    } else {
      dispatch(setTokenAndUserInfoAsync(oauthParams));
    }
  };

  const [handleLogin] = useOAuthLogin(oauthApp, onParamsRefreshed);

  useEffect(() => {
    if (datasetRequiresOAuth && oauthRequired && !oauthUpdatedFor(datasetRequiresOAuth)) {
      // step 1: require a new OAuth process, including the scope for the dataset
      const newScopes = new Set(
        (oauthApp.scopes ? [...oauthApp.scopes] : []).concat(
          scopeForDataset(datasetRequiresOAuth)
        )
      );

      const newOAuth = { ...oauthApp, scopes: [...newScopes] };
      dispatch(setOAuthApp(newOAuth));
    }
  });

  useEffect(() => {
    if (datasetRequiresOAuth && oauthRequired && oauthUpdatedFor(datasetRequiresOAuth)) {
      // step 2: login again, once that the new scopes are ready (including the desired datasets)
      handleLogin();
      setOauthRequired(false);
    }
  }, [datasetRequiresOAuth, oauthRequired, oauthUpdatedFor, handleLogin]);

  useEffect(() => {
    const tokenHasBeenRefreshed = token !== initialToken;
    if (
      datasetRequiresOAuth &&
      oauthUpdatedFor(datasetRequiresOAuth) &&
      tokenHasBeenRefreshed
    ) {
      // step 3: load dataset, once there is a new token that includes its access
      loadDataset(datasetRequiresOAuth);
      setDatasetRequiresOAuth(null); // ...and finish the process for this dataset
      setInitialToken(null);
    }
  }, [datasetRequiresOAuth, oauthUpdatedFor, token, initialToken, loadDataset]);

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
    <List>
      {props.datasets.map((dataset) => {
        const labelId = `checkbox-list-label-${dataset.name}`;
        const datasetLoaded = oauthLayer && oauthLayer.name === dataset.name;
        const secondary = `${dataset.privacy}`;

        return (
          <ListItem key={dataset.name} divider role={undefined}>
            <div className={classes.dataset}>
              <ListItemText
                id={labelId}
                primary={
                  <Typography className={classes.datasetName}>{dataset.name}</Typography>
                }
                secondary={secondary}
              />
            </div>
            <ListItemSecondaryAction>
              {datasetLoaded ? (
                <IconButton
                  edge='end'
                  aria-label='remove dataset'
                  onClick={() => removeDataset()}
                >
                  {/* Remove dataset */}
                  <HighlightOff color='primary' />
                </IconButton>
              ) : (
                <IconButton
                  edge='end'
                  aria-label='add dataset'
                  onClick={() => authorizeAndLoadDataset(dataset)}
                >
                  {/* Load dataset */}
                  <ChevronRight color='primary' />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
