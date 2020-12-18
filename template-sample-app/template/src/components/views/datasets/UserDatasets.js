import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectOAuthCredentials,
  addLayer,
  addSource,
  removeLayer,
  removeSource,
} from '@carto/react/redux';

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

import { setBottomSheetOpen } from 'config/appSlice';

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    height: theme.spacing(8),
  },
  loadingSpinner: {
    textAlign: 'center',

    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
}));

const toTitleCase = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const OAUTH_LAYER = 'oauthLayer';
const OAUTH_SOURCE = 'oauthSource';

export default function UserDatasets(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const credentials = useSelector(selectOAuthCredentials);
  const { oauthLayer } = useSelector((state) => state.carto.layers);

  const loadDataset = useCallback(
    (selectedDataset) => {
      const { name: datasetName, table_schema: schema } = selectedDataset;
      const dataSourceCredentials = { ...credentials };

      dispatch(
        addSource({
          id: OAUTH_SOURCE,
          data: `SELECT * FROM "${schema}".${datasetName}`,
          credentials: dataSourceCredentials,
        })
      );

      dispatch(
        addLayer({
          id: OAUTH_LAYER,
          source: OAUTH_SOURCE,
          layerAttributes: { name: datasetName },
        })
      );

      dispatch(setBottomSheetOpen(false));
    },
    [credentials, dispatch]
  );

  const removeDataset = useCallback(() => {
    dispatch(removeLayer(OAUTH_LAYER));
    dispatch(removeSource(OAUTH_SOURCE));
  }, [dispatch]);

  // cleanup when leaving
  useEffect(() => removeDataset, [removeDataset]);

  // Loading...
  if (props.loading) {
    return (
      <Grid
        container
        alignItems='center'
        justify='center'
        className={classes.loadingContainer}
      >
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
            selected={datasetLoaded}
            onClick={() => (datasetLoaded ? removeDataset() : loadDataset(dataset))}
          >
            <ListItemText id={labelId} primary={dataset.name} secondary={secondary} />
            {datasetLoaded ? (
              <HighlightOff color='action' />
            ) : (
              <ChevronRight color='action' />
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
