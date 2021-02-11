import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBottomSheetOpen, setError } from 'store/appSlice';
import { Divider, Grid, Typography, makeStyles } from '@material-ui/core';
import {
  addLayer,
  addSource,
  removeLayer,
  removeSource,
  setViewState,
} from '@carto/react/redux';
import { AggregationTypes, FormulaWidget, HistogramWidget } from '@carto/react/widgets';
import { numberFormatter } from 'utils/formatter';
import { TILESET_LAYER_ID } from 'components/layers/TilesetLayer';
import tilesetSource from 'data/sources/tilesetSource';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3, 3, 1.5),

    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(0),
    },
  },
}));

function Tileset() {
  const classes = useStyles();
  const dispatch = useDispatch();

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

    dispatch(setBottomSheetOpen(false));

    // Clean up when leave
    return () => {
      dispatch(removeLayer(TILESET_LAYER_ID));
      dispatch(removeSource(tilesetSource.id));
    };
  }, [dispatch]);

  const onTotalFareAmountWidgetError = (error) => {
    dispatch(setError(`Error obtaining avg fare amount: ${error.message}`));
  };

  return (
    <Grid item xs>
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
        viewportFilter
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
        viewportFilter
      />

      <Divider />
    </Grid>
  );
}

export default Tileset;
