import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Divider } from '@material-ui/core';
import { CategoryWidget, FormulaWidget } from 'lib/sdk/widgets';
import { AggregationTypes } from 'lib/sdk/models';
import { ADD_LAYER, setViewState } from 'lib/sdk/slice/cartoSlice';
import { currencyFormatter } from 'utils/formatter';

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
      {
        type: 'carto/addSource',
        payload: {
          id: 'kpiSource',
          data: `SELECT states.name, SUM(stores.revenue) as revenue, states.the_geom_webmercator
          FROM ne_50m_admin_1_states as states
          JOIN mcdonalds as stores
          ON ST_Intersects(states.the_geom_webmercator, stores.the_geom_webmercator)
          GROUP BY states.name, states.the_geom_webmercator`,
        },
      }
      // addSource({
      //   id: 'kpiSource',
      //   data: `SELECT states.name, SUM(stores.revenue) as revenue, states.the_geom_webmercator
      //     FROM ne_50m_admin_1_states as states
      //     JOIN mcdonalds as stores
      //     ON ST_Intersects(states.the_geom_webmercator, stores.the_geom_webmercator)
      //     GROUP BY states.name, states.the_geom_webmercator`,
      // })
    );
    // Add the layer
    dispatch(
      {
        type: ADD_LAYER,
        payload: {
          id: 'kpiLayer',
          source: 'kpiSource',
          selectedStore: null,
        },
      }
      // addLayer({
      //   id: 'kpiLayer',
      //   source: 'kpiSource',
      //   selectedStore: null,
      // })
    );
    // Clean up when leave
    return function cleanup() {
      // dispatch(removeLayer('kpiLayer'));
      // dispatch(removeSource('kpiSource'));
      dispatch({
        type: 'carto/removeLayer',
        payload: 'kpiLayer',
      });
      dispatch({
        type: 'carto/removeSource',
        payload: 'kpiSource',
      });
    };
  }, [dispatch]);

  return (
    <div>
      <FormulaWidget
        title='Total revenue'
        dataSource='kpiSource'
        column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewportFilter
      ></FormulaWidget>
      <Divider />
      <CategoryWidget
        title='Revenue by state'
        dataSource='kpiSource'
        column='name'
        operationColumn='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewportFilter
      />
    </div>
  );
}
