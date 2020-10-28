import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  addLayer,
  addDataSource,
  removeLayer,
  removeDataSource,
} from 'config/cartoSlice';
import { selectCredentials } from 'config/oauthSlice';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';

import { ChevronRight, HighlightOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  dataset: {
    maxWidth: '100%',
  },
  datasetName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

function DatasetsList(props) {
  const credentials = useSelector(selectCredentials);
  const dynamicLayersNames = useSelector((state) => {
    return Object.values(state.carto.layers)
      .filter((layer) => layer.dynamic)
      .map((layer) => layer.id);
  });
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState({});
  const classes = useStyles();

  const handleClickOpen = (dataset) => {
    setSelectedDataset(dataset);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Load dataset & layer to store (so to Map)
  const loadDataset = () => {
    handleClose();

    const { name: datasetName } = selectedDataset;

    dispatch(
      addDataSource({
        id: datasetName,
        data: `SELECT * FROM ${datasetName}`,
        credentials,
      })
    );

    dispatch(addLayer({ id: `${datasetName}`, source: datasetName, dynamic: true }));
  };

  // Remove dataset & layer from store (so from Map)
  const removeDataset = (dataset) => {
    dispatch(removeDataSource(dataset.name));
    dispatch(removeLayer(dataset.name));
  };

  if (props.datasets.length === 0) {
    return <Typography>No datasets available...</Typography>;
  }

  return (
    <>
      <List>
        {props.datasets.map((dataset) => {
          const labelId = `checkbox-list-label-${dataset.name}`;

          const datasetLoaded = dynamicLayersNames.includes(dataset.name);
          const secondary = `@${dataset.table_schema} (${dataset.privacy})`;

          return (
            <ListItem key={dataset.name} divider role={undefined}>
              <div className={classes.dataset}>
                <ListItemText
                  id={labelId}
                  primary={
                    <Typography className={classes.datasetName}>
                      {dataset.name}
                    </Typography>
                  }
                  secondary={secondary}
                />
              </div>
              <ListItemSecondaryAction>
                {datasetLoaded ? (
                  <IconButton
                    edge='end'
                    aria-label='remove dataset'
                    onClick={() => removeDataset(dataset)}
                  >
                    {/* Remove dataset */}
                    <HighlightOff color='primary' />
                  </IconButton>
                ) : (
                  <IconButton
                    edge='end'
                    aria-label='add dataset'
                    onClick={() => handleClickOpen(dataset)}
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-add-dataset-dialog'
        aria-describedby='alert-add-dataset-description'
      >
        <DialogTitle id='alert-add-dataset-dialog'>{'Load dataset'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-add-dataset-description'>
            You are going to load Dataset <strong>{selectedDataset.name}</strong>, are you
            sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' disableElevation>
            Cancel
          </Button>
          <Button
            onClick={loadDataset}
            variant='contained'
            color='primary'
            autoFocus
            disableElevation
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DatasetsList;
