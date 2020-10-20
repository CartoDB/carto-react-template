import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { addLayer, addDataSource, removeLayer } from 'config/cartoSlice';

function Kpi() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addDataSource({
        id: 'revenueByStateSource',
        data: `SELECT states.name, SUM(stores.revenue) as revenue, states.the_geom_webmercator 
          FROM ne_50m_admin_1_states as states
          JOIN mcdonalds as stores
          ON ST_Contains(states.the_geom, stores.the_geom)
          GROUP BY states.name, states.the_geom_webmercator`,
      })
    );

    dispatch(addLayer({ id: 'revenueByStateLayer', source: 'revenueByStateSource' }));

    return function cleanup() {
      dispatch(removeLayer('revenueByStateLayer'));
    };
  });

  return <Outlet />;
}

export default Kpi;
