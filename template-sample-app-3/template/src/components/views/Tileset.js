import { useEffect } from 'react';
import tilesetSource from 'data/sources/tilesetSource';
import { TILESET_LAYER_ID } from 'components/layers/TilesetLayer';
import { useDispatch } from 'react-redux';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  tileset: {},
}));

export default function Tileset() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(tilesetSource));

    dispatch(
      addLayer({
        id: TILESET_LAYER_ID,
        source: tilesetSource.id,
      })
    );

    return () => {
      dispatch(removeLayer(TILESET_LAYER_ID));
      dispatch(removeSource(tilesetSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.tileset}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
