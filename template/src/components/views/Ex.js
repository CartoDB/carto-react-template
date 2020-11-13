import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function Ex() {
  const classes = useStyles();

  return (
    <Grid container direction='row' className={classes.root}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
