import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from 'config/appSlice';

import { Divider } from '@material-ui/core';

import { api, slice, widgets } from 'react-victor-test';

import { currencyFormatter } from 'utils/formatter';

const { CategoryWidget, FormulaWidget } = widgets;
const { addLayer, addSource, removeLayer, removeSource, setViewState } = slice;

export default function Kpi() {
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
        data: `SELECT states.name, SUM(stores.revenue) as revenue, states.the_geom_webmercator
          FROM ne_50m_admin_1_states as states
          JOIN mcdonalds as stores
          ON ST_Intersects(states.the_geom_webmercator, stores.the_geom_webmercator)
          GROUP BY states.name, states.the_geom_webmercator`,
      })
    );
    // Add the layer
    dispatch(
      addLayer({
        id: 'kpiLayer',
        source: 'kpiSource',
        selectedStore: null,
      })
    );
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
      <FormulaWidget
        title='Total revenue'
        dataSource='kpiSource'
        column='revenue'
        operation={api.AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewportFilter
        onError={onTotalRevenueWidgetError}
      ></FormulaWidget>
      <Divider />
      <CategoryWidget
        title='Revenue by state'
        dataSource='kpiSource'
        column='name'
        operationColumn='revenue'
        operation={api.AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewportFilter
        onError={onRevenueByStateWidgetError}
      />
    </div>
  );
}
