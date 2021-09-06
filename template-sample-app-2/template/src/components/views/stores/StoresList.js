import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBottomSheetOpen, setError } from 'store/appSlice';
import { Divider, Grid, Typography, makeStyles, Box } from '@material-ui/core';
import { AggregationTypes } from '@carto/react-core';
import {
  FormulaWidget,
  CategoryWidget,
  HistogramWidget,
  ScatterPlotWidget,
  TimeSeriesWidget
} from '@carto/react-widgets';
import { currencyFormatter, numberFormatter } from 'utils/formatter';
import storesSource from 'data/sources/storesSource';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3, 3, 1.5),
  },
  // timeSeries: {
  //   position: 'fixed',
  //   left: '50%',
  //   background: 'white',
  //   width: 800,
  //   bottom: 32,
  //   transform: 'translateX(-50%)',
  // }
}));

function StoresList() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBottomSheetOpen(false));
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
    <Grid item xs>
      <Typography variant='h5' gutterBottom className={classes.title}>
        Store Analysis
      </Typography>

      {/* <Box className={classes.timeSeries}>
        <TimeSeriesWidget
          id='timeSeries'
          title='Time series'
          dataSource={storesSource.id}
          column='date'
        />
      </Box> */}

      {/* <Divider /> */}

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
        formatter={numberFormatter}
        xAxisFormatter={currencyFormatter}
        operation={AggregationTypes.COUNT}
        column='revenue'
        ticks={[1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000]}
        onError={onStoresByRevenueWidgetError}
      />

      <Divider />

      <ScatterPlotWidget
        id='revenueBySize'
        title='Revenue by size (m2 >> $)'
        dataSource={storesSource.id}
        xAxisColumn='size_m2'
        yAxisColumn='revenue'
        yAxisFormatter={currencyFormatter}
        tooltipFormatter={(v) => `${v.value[0]} m2 >> ${v.value[1]} $`}
        onError={onRevenueBySizeWidgetError}
      />
      <Divider />
    </Grid>
  );
}

export default StoresList;
