import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  List,
  ListItem,
  // ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';

import { ChevronRight } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  datasetsNotAvailable: {
    border: '0.5px solid',
    color: theme.palette.warning.main,
    padding: 20,
  },
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
    return (
      <Typography className={classes.datasetsNotAvailable}>
        To see a list of datasets, you have to login first using your CARTO account
      </Typography>
    );
  }

  return (
    <List>
      {props.datasets.map((dataset) => {
        const labelId = `checkbox-list-label-${dataset.name}`;

        return (
          <ListItem key={dataset.name} divider role={undefined}>
            {/*
                  <ListItemIcon>
                    a symbol based on geometry?
                  </ListItemIcon>
                  */}
            <div className={classes.dataset}>
              <ListItemText
                id={labelId}
                primary={dataset.name}
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
