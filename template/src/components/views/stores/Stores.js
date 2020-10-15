import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { addLayer, addDataSource, removeLayer } from 'config/cartoSlice';

function Stores() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addDataSource({
        id: 'storesSource',
        data:
          'SELECT cartodb_id, store_id, zip, storetype, state, revenue, the_geom_webmercator FROM mcdonalds',
      })
    );

    dispatch(addLayer({ id: 'storesLayer', source: 'storesSource' }));

    return function cleanup() {
      dispatch(removeLayer('storesLayer'));
    };
  });

  return <Outlet />;
}

export default Stores;
