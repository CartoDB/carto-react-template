import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Divider } from '@material-ui/core';
import {
  AggregationTypes,
  CategoryWidget,
  FormulaWidget,
  currencyFormatter,
} from 'lib/sdk';
import {
  setViewState,
  addSource,
  addLayer,
  removeLayer,
  removeSource,
} from 'config/cartoSlice';

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

  useEffect(() => {
    // Attach the layer
    dispatch(
      addLayer({
        id: 'exampleLayer',
        source: 'example',
      })
    );
    // Cleanup
    return function cleanup() {
      dispatch(removeLayer('exampleLayer'));
      dispatch(removeSource('example'));
    };
  }, [dispatch]);

  return (
    <div>
      <FormulaWidget
        title='Total revenue'
        data-source='kpiSource'
        column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewport-filter
      ></FormulaWidget>
      <Divider />
      <CategoryWidget
        title='Revenue by state'
        data-source='kpiSource'
        column='name'
        operation-column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewport-filter
      />
    </div>
  );
}
