import React from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Snackbar } from '@material-ui/core';
import { Map } from 'components/common/Map';
import { Legend } from 'components/legends/Legend';
import { GeocoderWidget } from 'lib';
import { getLayers } from 'components/layers';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
// import { setError } from 'lib/sdk/slice/cartoSlice';

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'start',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  sidebarWrapper: {
    position: 'relative',
    width: '350px',
    height: '100%',
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[3],
    overflow: 'auto',
    zIndex: 1,
  },
  mapWrapper: {
    position: 'relative',
    width: 'calc(100% - 350px)',
    height: '100%',
    overflow: 'hidden',
  },
  legend: {
    position: 'absolute',
    bottom: theme.spacing(3.5),
    right: theme.spacing(4),
  },
  geocoder: {
    position: 'absolute',
    top: theme.spacing(3.5),
    marginLeft: theme.spacing(4),
  },
}));

export default function Main() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.carto.error);
  const classes = useStyles();

  const handleClose = () => {
    // dispatch(setError(null));
  };

  return (
    <Grid container direction='row' className={classes.contentWrapper}>
      <Grid
        container
        direction='column'
        alignItems='stretch'
        item
        className={classes.sidebarWrapper}
      >
        <Outlet />
      </Grid>
      <Grid item className={classes.mapWrapper}>
        <Map layers={getLayers()} />
        <GeocoderWidget className={classes.geocoder} />
        <Legend className={classes.legend} />
      </Grid>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity='error'>{error}</Alert>
      </Snackbar>
    </Grid>
  );
}
