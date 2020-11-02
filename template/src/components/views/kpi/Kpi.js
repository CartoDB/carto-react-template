import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Divider } from '@material-ui/core';
import { AggregationTypes } from 'lib/sdk';
import { CategoryWidget } from 'components/common/widgets/CategoryWidget';
import { FormulaWidget } from 'components/common/widgets/FormulaWidget';
import { setViewState, addDataSource, addLayer, removeLayer } from 'config/cartoSlice';
import { currencyFormatter } from 'utils/numberFormatters';

function Kpi() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addDataSource({
        id: 'revenueByStateSource',
        data: `SELECT states.name, SUM(stores.revenue) as revenue, states.the_geom_webmercator 
          FROM ne_50m_admin_1_states as states
          JOIN mcdonalds as stores
          ON ST_Intersects(states.the_geom_webmercator, stores.the_geom_webmercator)
          GROUP BY states.name, states.the_geom_webmercator`,
      })
    );

    return function cleanup() {
      dispatch(removeLayer('revenueByStateLayer'));
    };
  });

  useEffect(() => {
    dispatch(
      setViewState({
        latitude: 31.802892,
        longitude: -103.007813,
        zoom: 3,
        transitionDuration: 500,
      })
    );
    dispatch(
      addLayer({
        id: 'revenueByStateLayer',
        source: 'revenueByStateSource',
        selectedStore: null,
      })
    );
  });

  return (
    <div>
      <FormulaWidget
        title='Total revenue'
        data-source='revenueByStateSource'
        operation-column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewport-filter
      ></FormulaWidget>
      <Divider />
      <CategoryWidget
        title='Revenue by state'
        data-source='revenueByStateSource'
        column='name'
        operation-column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
        viewport-filter
      />
    </div>
  );
}

export default Kpi;
