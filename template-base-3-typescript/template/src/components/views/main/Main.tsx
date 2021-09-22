import { lazy } from 'react';
import { useEffect } from 'react';
import exampleSource from 'data/sources/exampleSource';
import { EXAMPLE_LAYER_ID } from 'components/layers/ExampleLayer';
import { useDispatch } from 'react-redux';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import LazyLoadComponent from 'components/common/LazyLoadComponent';
import { Grid } from '@material-ui/core';

const MapContainer = lazy(
  () =>
    import(
      /* webpackChunkName: 'map-container' */ 'components/views/main/MapContainer'
    ),
);
const Sidebar = lazy(
  () =>
    import(/* webpackChunkName: 'sidebar' */ 'components/views/main/Sidebar'),
);
const ErrorSnackbar = lazy(
  () =>
    import(
      /* webpackChunkName: 'error-snackbar' */ 'components/common/ErrorSnackbar'
    ),
);

const useStyles = makeStyles((theme) => ({
  main: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));

export default function Main() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(exampleSource));

    dispatch(
      addLayer({
        id: EXAMPLE_LAYER_ID,
        source: exampleSource.id,
      })
    );

    return () => {
      dispatch(removeLayer(EXAMPLE_LAYER_ID));
      dispatch(removeSource(exampleSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid
      container
      direction='row'
      alignItems='stretch'
      item
      xs
      className={classes.main}
    >
      <LazyLoadComponent>
        <Sidebar />
        <MapContainer />
        <ErrorSnackbar />
      </LazyLoadComponent>
    </Grid>
  );
}
