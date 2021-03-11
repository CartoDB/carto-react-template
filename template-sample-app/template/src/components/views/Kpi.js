import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBottomSheetOpen, setError } from 'store/appSlice';
import { Divider, Typography, makeStyles } from '@material-ui/core';
import {
  addLayer,
  addSource,
  removeLayer,
  removeSource,
  setViewState,
} from '@carto/react-redux';
import kpiSource from 'data/sources/kpiSource';
import { KPI_LAYER_ID } from 'components/layers/KpiLayer';
import { AggregationTypes } from '@carto/react-core';
import { CategoryWidget, FormulaWidget, HistogramWidget } from '@carto/react-widgets';

import { currencyFormatter, numberFormatter } from 'utils/formatter';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3, 3, 1.5),
  },
}));

function Kpi() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setViewState({
        latitude: 31.802892,
        longitude: -103.007813,
        zoom: 3,
        transitionDuration: 500,
      })
    );

    dispatch(addSource(kpiSource));

    dispatch(
      addLayer({
        id: KPI_LAYER_ID,
        source: kpiSource.id,
        selectedStore: null,
      })
    );

    // Close bottom panel
    dispatch(setBottomSheetOpen(false));

    return () => {
      dispatch(removeLayer(KPI_LAYER_ID));
      dispatch(removeSource(kpiSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  const onTotalRevenueWidgetError = (error) => {
    dispatch(setError(`Error obtaining total revenue: ${error.message}`));
  };

  const onRevenueByStateWidgetError = (error) => {
    dispatch(setError(`Error obtaining revenue by state: ${error.message}`));
  };

  return (
    <div>
      <Typography variant='h5' gutterBottom className={classes.title}>
        States Analysis
      </Typography>

      <Divider />

      <FormulaWidget
        id='totalRevenue'
        title='Total revenue'
        dataSource={kpiSource.id}
        column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        onError={onTotalRevenueWidgetError}
      />

      <Divider />

      <CategoryWidget
        id='revenueByState'
        title='Revenue by state'
        dataSource={kpiSource.id}
        column='name'
        operationColumn='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        onError={onRevenueByStateWidgetError}
      />

      <Divider />

      <HistogramWidget
        id='revenueByStateHistogram'
        title='Revenue by state histogram'
        dataSource={kpiSource.id}
        formatter={numberFormatter}
        xAxisFormatter={currencyFormatter}
        operation={AggregationTypes.COUNT}
        column='revenue'
        ticks={[10e6, 50e6, 10e7, 50e7, 75e7, 1e9, 2e9]}
      />

      <Divider />
    </div>
  );
}

export default Kpi;
