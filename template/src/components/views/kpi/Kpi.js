import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { addDataSource, removeLayer } from 'config/cartoSlice';

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

  return <Outlet />;
}

export default Kpi;
