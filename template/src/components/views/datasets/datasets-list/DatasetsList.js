import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';

import { ChevronRight } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  dataset: {
    maxWidth: 'calc(90%)',
  },
  datasetName: {
    textOverflow: 'ellipsis',
  },
}));

function DatasetsList(props) {
  const classes = useStyles();

  if (props.datasets.length === 0) {
    return <Typography>No datasets available...</Typography>;
  }

  return (
    <List>
      {props.datasets.map((dataset) => {
        const labelId = `checkbox-list-label-${dataset.name}`;

        return (
          <ListItem key={dataset.name} divider role={undefined}>
            <div className={classes.dataset}>
              <ListItemText
                id={labelId}
                primary={dataset.name}
                secondary={dataset.privacy}
                className={classes.datasetName}
              />
            </div>
            <ListItemSecondaryAction>
              <IconButton edge='end' aria-label='add dataset'>
                <ChevronRight />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

export default DatasetsList;
