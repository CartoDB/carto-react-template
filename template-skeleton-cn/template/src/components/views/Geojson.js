import { useEffect } from 'react';
import geojsonSource from 'data/sources/geojsonSource';
import { GEOJSON_LAYER_ID } from 'components/layers/GeojsonLayer';
import { useDispatch } from 'react-redux';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react-redux';

import { AggregationTypes } from '@carto/react-core';
import { FormulaWidget, CategoryWidget, HistogramWidget } from '@carto/react-widgets';
import { numberFormatter } from 'utils/formatter';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3, 3, 1.5),

    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(0),
    },
  },
}));

export default function Geojson() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(geojsonSource));

    dispatch(
      addLayer({
        id: GEOJSON_LAYER_ID,
        source: geojsonSource.id,
      })
    );

    return () => {
      dispatch(removeLayer(GEOJSON_LAYER_ID));
      dispatch(removeSource(geojsonSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.root}>
      <Typography variant='h5' gutterBottom className={classes.title}>
        States population
      </Typography>

      <FormulaWidget
        id='totalPop'
        title='Total pop'
        dataSource={geojsonSource.id}
        column='total_pop'
        operation={AggregationTypes.SUM}
        formatter={numberFormatter}
      />

      <Divider />

      <CategoryWidget
        id='populationByCategory'
        title='Population by Category'
        dataSource={geojsonSource.id}
        column='pop_cat'
        operation={AggregationTypes.COUNT}
        formatter={numberFormatter}
        // onError={onRevenueByStateWidgetError}
      />

      <Divider />

      <HistogramWidget
        id='populationHistogram'
        title='Population histogram'
        dataSource={geojsonSource.id}
        xAxisFormatter={numberFormatter}
        operation={AggregationTypes.SUM}
        column='total_pop'
        ticks={[0.25e7, 0.5e7, 0.75e7, 1e7, 1.25e7, 1.5e7]}
      />
    </Grid>
  );
}
