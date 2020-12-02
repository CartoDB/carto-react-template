import React from 'react';
import KpiLegend from './KpiLegend';
import StoresLegend from './StoresLegend';
import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.caption,
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.common.white,

    '&:empty': {
      display: 'none',
    },
  },
}));

export function Legend(props) {
  const classes = useStyles();
  return (
    <Paper elevation={4} className={`${classes.root} ${props.className} `}>
      <KpiLegend />
      <StoresLegend />
    </Paper>
  );
}
