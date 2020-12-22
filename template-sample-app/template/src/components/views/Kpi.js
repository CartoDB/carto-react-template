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
  CategoryWidget,
  FormulaWidget,
} from '@carto/react/widgets';

import { currencyFormatter } from 'utils/formatter';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3, 3, 1.5)
  },
}));

export default function Kpi() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    // Set the view state
    dispatch(
      setViewState({
        latitude: 31.802892,
        longitude: -103.007813,
        zoom: 3,
        transitionDuration: 500,
      })
    );
    // Add the source query for the KPI
    dispatch(
      addSource({
        id: 'kpiSource',
        sourceType: SourceTypes.TILE_LAYER,
        data: `SELECT states.cartodb_id, states.name, SUM(stores.revenue) as revenue, states.the_geom_webmercator
          FROM ne_50m_admin_1_states as states
          JOIN retail_stores as stores
          ON ST_Intersects(states.the_geom_webmercator, stores.the_geom_webmercator)
          GROUP BY states.cartodb_id, states.name, states.the_geom_webmercator`,
      })
    );
    // Add the layer
    dispatch(
      addLayer({
        id: 'kpiLayer',
        source: 'kpiSource',
      })
    );
    // Close bottom panel
    dispatch(setBottomSheetOpen(false));

    // Clean up when leave
    return function cleanup() {
      dispatch(removeLayer('kpiLayer'));
      dispatch(removeSource('kpiSource'));
    };
  }, [dispatch]);

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
        title='Total revenue'
        dataSource='kpiSource'
        column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        onError={onTotalRevenueWidgetError}
      ></FormulaWidget>
      <Divider />
      <CategoryWidget
        id='revenuByState'
        title='Revenue by state'
        dataSource='kpiSource'
        column='name'
        operationColumn='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        onError={onRevenueByStateWidgetError}
      />

      <Divider />
    </div>
  );
}
