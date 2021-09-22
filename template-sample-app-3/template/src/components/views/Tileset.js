import { useEffect } from 'react';
import tilesetSource from 'data/sources/tilesetSource';
import { TILESET_LAYER_ID } from 'components/layers/TilesetLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
  setViewState,
} from '@carto/react-redux';
import { setError } from 'store/appSlice';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography } from '@material-ui/core';

import { FormulaWidget, HistogramWidget } from '@carto/react-widgets';
import { numberFormatter } from 'utils/formatter';
import { AggregationTypes } from '@carto/react-core';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3, 3, 1.5),

    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(0),
    },
  },
  tileset: {},
}));

export default function Tileset() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(
      setViewState({
        latitude: 0,
        longitude: 0,
        zoom: 1,
        transitionDuration: 500,
      })
    );
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

  const onTotalFareAmountWidgetError = (error) => {
    dispatch(setError(`Error obtaining avg fare amount: ${error.message}`));
  };

  return (
    <Grid container direction='column' className={classes.tileset}>
      <Typography variant='h5' gutterBottom className={classes.title}>
        OSM Buildings Analysis
      </Typography>

      <Divider />

      <FormulaWidget
        id='aggTotalFormulaSum'
        title='Total aggregated sum'
        dataSource={tilesetSource.id}
        column='aggregated_total'
        operation={AggregationTypes.SUM}
        formatter={numberFormatter}
        onError={onTotalFareAmountWidgetError}
      />

      <Divider />

      <HistogramWidget
        id='aggTotalHistogramCount'
        title='Total aggregated count'
        dataSource={tilesetSource.id}
        xAxisFormatter={numberFormatter}
        operation={AggregationTypes.COUNT}
        column='aggregated_total'
        ticks={[10, 100, 1e3, 1e4, 1e5, 1e6]}
      />

      <Divider />
    </Grid>
  );
}
