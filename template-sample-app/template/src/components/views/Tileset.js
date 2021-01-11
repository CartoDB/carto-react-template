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
import { AggregationTypes, FormulaWidget, HistogramWidget } from '@carto/react/widgets';

import { currencyFormatter, numberFormatter } from 'utils/formatter';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3, 3, 1.5),

    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(0),
    },
  },
}));

export default function Tileset() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setViewState({
        latitude: 40.7368521,
        longitude: -73.8536065,
        zoom: 7,
        transitionDuration: 500,
      })
    );

    dispatch(
      addSource({
        id: 'tilesetSource',
        type: 'bq',
        data: 'cartodb-gcp-backend-data-team.alasarr.usa_blockgroup_population',
      })
    );

    dispatch(
      addLayer({
        id: 'tilesetLayer',
        source: 'tilesetSource',
      })
    );

    dispatch(setBottomSheetOpen(false));

    // Clean up when leave
    return function cleanup() {
      dispatch(removeLayer('tilesetLayer'));
      dispatch(removeSource('tilesetSource'));
    };
  }, [dispatch]);

  const onTotalFareAmountWidgetError = (error) => {
    dispatch(setError(`Error obtaining avg fare amount: ${error.message}`));
  };

  return (
    <div>
      <Typography variant='h5' gutterBottom className={classes.title}>
        Total population
      </Typography>

      <Divider />

      <FormulaWidget
        id='populationAvg'
        title='Average population'
        dataSource='tilesetSource'
        column='total_pop'
        operation={AggregationTypes.AVG}
        formatter={currencyFormatter}
        onError={onTotalFareAmountWidgetError}
        viewportFilter
      ></FormulaWidget>

      <Divider />

      <HistogramWidget
        id='populationCount'
        title='Population count'
        dataSource='tilesetSource'
        formatter={numberFormatter}
        xAxisFormatter={currencyFormatter}
        operation={AggregationTypes.COUNT}
        column='total_pop'
        ticks={[0, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8]}
        viewportFilter
      ></HistogramWidget>

      <Divider />
    </div>
  );
}
