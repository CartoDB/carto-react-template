import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBottomSheetOpen, setError } from 'config/appSlice';

import { Divider, Typography, makeStyles } from '@material-ui/core';

import {
  addLayer,
  addSource,
  removeLayer,
  removeSource,
  setViewState,
} from '@carto/react/redux';
import {
  AggregationTypes,
  SourceTypes,
  FormulaWidget,
  HistogramWidget,
} from '@carto/react/widgets';

import { currencyFormatter, numberFormatter } from 'utils/formatter';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3, 3, 1.5),

    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(0),
    },
  },
}));

export default function Taxis() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setViewState({
        latitude: 40.7368521,
        longitude: -73.8536065,
        zoom: 9,
        transitionDuration: 500,
      })
    );

    dispatch(
      addSource({
        id: 'taxisSource',
        sourceType: SourceTypes.TILE_LAYER,
        data: 'cartobq.maps.nyc_taxi_points_demo_id',
      })
    );

    dispatch(
      addLayer({
        id: 'taxisLayer',
        source: 'taxisSource',
      })
    );

    dispatch(setBottomSheetOpen(false));

    // Clean up when leave
    return function cleanup() {
      dispatch(removeLayer('taxisLayer'));
      dispatch(removeSource('taxisSource'));
    };
  }, [dispatch]);

  const onTotalFareAmountWidgetError = (error) => {
    dispatch(setError(`Error obtaining avg fare amount: ${error.message}`));
  };

  return (
    <div>
      <Typography variant='h5' gutterBottom className={classes.title}>
        Taxis Fare Amount Analysis
      </Typography>

      <Divider />

      <FormulaWidget
        title='Average fare amount'
        dataSource='taxisSource'
        column='avg_fare_amount'
        operation={AggregationTypes.AVG}
        formatter={currencyFormatter}
        onError={onTotalFareAmountWidgetError}
      ></FormulaWidget>

      <Divider />

      <HistogramWidget
        id='taxisByFareAmount'
        title='Taxis by fare amount'
        dataSource='taxisSource'
        formatter={numberFormatter}
        xAxisFormatter={currencyFormatter}
        operation={AggregationTypes.COUNT}
        column='avg_fare_amount'
        ticks={[0, 10, 20, 40, 60, 80, 90, 100]}
      ></HistogramWidget>

      <Divider />

      <HistogramWidget
        id='taxisByTipPercetage'
        title='Taxis by tip percentage'
        dataSource='taxisSource'
        formatter={numberFormatter}
        xAxisFormatter={currencyFormatter}
        operation={AggregationTypes.COUNT}
        column='avg_tip_percentage'
        ticks={[0, 0.05, 0.1, 0.25, 0.5, 0.75, 1]}
      ></HistogramWidget>

      <Divider />
    </div>
  );
}
