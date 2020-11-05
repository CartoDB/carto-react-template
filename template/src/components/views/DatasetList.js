import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addLayer, addSource, removeLayer, removeSource } from 'config/cartoSlice';
import { selectOAuthCredentials } from 'config/oauthSlice';

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

function DatasetList(props) {
  const credentials = useSelector(selectOAuthCredentials);
  const { oauthLayer } = useSelector((state) => state.carto.layers);

  const dispatch = useDispatch();
  const classes = useStyles();

  // Load dataset & layer to store (so to Map)
  const loadDataset = (selectedDataset) => {
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
  };

  // Remove dataset & layer from store (so from Map)
  const removeDataset = () => {
    dispatch(removeSource('oauthSource'));
    dispatch(removeLayer('oauthLayer'));
  };

  if (props.loading) {
    return (
      <Grid container alignItems='center'>
        <Grid item className={classes.loadingSpinner}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  if (props.datasets.length === 0) {
    return <Typography>No datasets available...</Typography>;
  }

  return (
    <List>
      {props.datasets.map((dataset) => {
        const labelId = `checkbox-list-label-${dataset.name}`;

        const datasetLoaded = oauthLayer && oauthLayer.name === dataset.name;
        // const secondary = `@${dataset.table_schema} (${dataset.privacy})`;
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
                  onClick={() => loadDataset(dataset)}
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

export default DatasetList;
