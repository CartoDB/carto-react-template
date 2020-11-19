import React from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Snackbar } from '@material-ui/core';
import { Map } from 'components/common/Map';
import { GeocoderWidget } from '@carto/react/widgets';
import { getLayers } from 'components/layers';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { setError } from 'config/appSlice';

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
  geocoder: {
    position: 'absolute',
    top: theme.spacing(3),
    left: theme.spacing(3),
  },
}));

export default function Main() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.app.error);
  const classes = useStyles();

  const handleClose = () => {
    dispatch(setError(null));
  };

  const onGeocoderWidgetError = (error) => {
    dispatch(setError(`Geocoding error: ${error.message}`));
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
        <GeocoderWidget className={classes.geocoder} onError={onGeocoderWidgetError} />
      </Grid>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity='error'>{error}</Alert>
      </Snackbar>
    </Grid>
  );
}
