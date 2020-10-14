import React from 'react';
import { Button, Divider, Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Components() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs='6'>
          <Typography variant='h1'>This is h1!</Typography>
        </Grid>
        <Grid item xs='6'>
          <Typography variant='h2'>This is h2!</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant='h3'>This is h3!</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant='h4'>This is h4!</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant='h5'>This is h5!</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant='h6'>This is h6!</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant='subtitle1'>This is subtitle1!</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant='subtitle2'>This is subtitle2!</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant='body1'>This is body1!</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant='body2'>This is body2!</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant='button'>This is button!</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant='caption'>This is caption!</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant='overline'>This is overline!</Typography>
        </Grid>
        <Grid item xs='12'>
          <Divider />
        </Grid>
        <Grid item xs>
          <Button variant='contained' color='primary'>
            Button Primary
          </Button>
        </Grid>
        <Grid item xs>
          <Button variant='contained' color='secondary'>
            Button Secondary
          </Button>
        </Grid>
        <Grid item xs>
          <Button variant='outlined' color='primary'>
            Button Primary
          </Button>
        </Grid>
        <Grid item xs>
          <Button variant='outlined' color='secondary'>
            Button Secondary
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Components;
