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
} from '@carto/react-redux';
import { AggregationTypes } from '@carto/react-core';
import { FormulaWidget, CategoryWidget, HistogramWidget } from '@carto/react-widgets';
import { numberFormatter } from 'utils/formatter';
import { GEOJSON_LAYER_ID } from 'components/layers/GeoJSONLayer';
import geoJSONSource from 'data/sources/geoJSONSource';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3, 3, 1.5),

    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(0),
    },
  },
}));

function GeoJson() {
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

    dispatch(addSource(geoJSONSource));

    dispatch(
      addLayer({
        id: GEOJSON_LAYER_ID,
        source: geoJSONSource.id,
      })
    );

    dispatch(setBottomSheetOpen(false));

    // Clean up when leave
    return () => {
      dispatch(removeLayer(GEOJSON_LAYER_ID));
      dispatch(removeSource(geoJSONSource.id));
    };
  }, [dispatch]);

  const onTotalPopError = (error) => {
    dispatch(setError(`Error obtaining total pop: ${error.message}`));
  };

  return (
    <Grid item xs>
      <Typography variant='h5' gutterBottom className={classes.title}>
        OSM Buildings Analysis
      </Typography>

      <Divider />

      <FormulaWidget
        id='totalPop'
        title='Total pop'
        dataSource={geoJSONSource.id}
        column='total_pop'
        operation={AggregationTypes.SUM}
        formatter={numberFormatter}
        onError={onTotalPopError}
      />

      <Divider />

      <CategoryWidget
        id='populationByCategory'
        title='Population by Category'
        dataSource={geoJSONSource.id}
        column='pop_cat'
        operation={AggregationTypes.COUNT}
        formatter={numberFormatter}
        // onError={onRevenueByStateWidgetError}
      />

      <Divider />

      <HistogramWidget
        id='populationHistogram'
        title='Population histogram'
        dataSource={geoJSONSource.id}
        xAxisFormatter={numberFormatter}
        operation={AggregationTypes.SUM}
        column='total_pop'
        ticks={[0.25e7, 0.5e7, 0.75e7, 1e7, 1.25e7, 1.5e7]}
      />
    </Grid>
  );
}

export default GeoJson;
