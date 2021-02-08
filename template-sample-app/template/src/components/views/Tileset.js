import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBottomSheetOpen, setError } from 'config/appSlice';
import { Divider, Grid, Typography, makeStyles } from '@material-ui/core';
import {
  addLayer,
  addSource,
  removeLayer,
  removeSource,
  setViewState,
} from '@carto/react/redux';
import {
  AggregationTypes,
  FormulaWidget,
  HistogramWidget,
  CategoryWidget,
} from '@carto/react/widgets';
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
        latitude: 31.802892,
        longitude: -103.007813,
        zoom: 4,
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
        id='aggTotalPop'
        title='Total population'
        dataSource={tilesetSource.id}
        column='total_pop'
        operation={AggregationTypes.SUM}
        formatter={numberFormatter}
        onError={onTotalFareAmountWidgetError}
        viewportFilter
      />

      <CategoryWidget
        id='revenueByStoreType'
        title='Revenue by store type'
        dataSource={tilesetSource.id}
        column='pop_cat'
        operationColumn='total_pop'
        operation={AggregationTypes.SUM}
        formatter={numberFormatter}
        viewportFilter
      />
      <Divider />

      <HistogramWidget
        id='aggTotalHistogramCount'
        title='Population by geoid'
        dataSource={tilesetSource.id}
        xAxisFormatter={numberFormatter}
        operation={AggregationTypes.COUNT}
        column='total_pop'
        ticks={[800, 1000, 1200, 1400, 2000, 3000]}
        viewportFilter
      />

      <Divider />
    </Grid>
  );
}

export default Tileset;
