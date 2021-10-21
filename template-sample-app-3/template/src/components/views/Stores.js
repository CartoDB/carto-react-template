import { AggregationTypes } from '@carto/react-core';
import {
  FormulaWidget,
  CategoryWidget,
  HistogramWidget,
  ScatterPlotWidget,
} from '@carto/react-widgets';
import { currencyFormatter, numberFormatter } from 'utils/formatter';

import { useEffect } from 'react';
import storesSource from 'data/sources/storesSource';
import { STORES_LAYER_ID } from 'components/layers/StoresLayer';
import { useDispatch } from 'react-redux';
import { setError } from 'store/appSlice';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
  setViewState,
} from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3, 3, 1.5),
  },
}));

export default function Stores() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(
      setViewState({
        latitude: 31.802892,
        longitude: -103.007813,
        zoom: 3,
        transitionDuration: 500,
      })
    );

    dispatch(addSource(storesSource));

    dispatch(
      addLayer({
        id: STORES_LAYER_ID,
        source: storesSource.id,
      })
    );

    return () => {
      dispatch(removeLayer(STORES_LAYER_ID));
      dispatch(removeSource(storesSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  const onTotalRevenueWidgetError = (error) => {
    dispatch(setError(`Error obtaining total revenue: ${error.message}`));
  };

  const onRevenuePerTypeWidgetError = (error) => {
    dispatch(setError(`Error obtaining revenue per type: ${error.message}`));
  };

  const onStoresByRevenueWidgetError = (error) => {
    dispatch(setError(`Error obtaining stores per revenue: ${error.message}`));
  };

  const onRevenueBySizeWidgetError = (error) => {
    dispatch(setError(`Error obtaining revenue per size: ${error.message}`));
  };

  return (
    <Grid container direction='column' className={classes.stores}>
      <Grid item>
        <Typography variant='h5' gutterBottom className={classes.title}>
          Store Analysis
        </Typography>

        <Divider />

        <FormulaWidget
          id='totalRevenue'
          title='Total revenue'
          dataSource={storesSource.id}
          column='revenue'
          operation={AggregationTypes.SUM}
          formatter={currencyFormatter}
          onError={onTotalRevenueWidgetError}
        />

        <Divider />

        <CategoryWidget
          id='revenueByStoreType'
          title='Revenue by store type'
          dataSource={storesSource.id}
          column='storetype'
          operationColumn='revenue'
          operation={AggregationTypes.SUM}
          formatter={currencyFormatter}
          onError={onRevenuePerTypeWidgetError}
        />

        <Divider />

        <HistogramWidget
          id='storesByRevenue'
          title='Stores by revenue'
          dataSource={storesSource.id}
          column='revenue'
          operation={AggregationTypes.COUNT}
          ticks={[1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000]}
          formatter={currencyFormatter}
          xAxisFormatter={currencyFormatter}
          onError={onStoresByRevenueWidgetError}
        />

        <Divider />

        <ScatterPlotWidget
          id='revenueBySize'
          title='Revenue by size (m2 >> $)'
          dataSource={storesSource.id}
          xAxisColumn='size_m2'
          xAxisFormatter={(v) => `${v} m2`}
          yAxisColumn='revenue'
          yAxisFormatter={currencyFormatter}
          tooltipFormatter={(v) => `${v.value[0]} m2 >> ${v.value[1]} $`}
          onError={onRevenueBySizeWidgetError}
        />
        <Divider />
      </Grid>
    </Grid>
  );
}