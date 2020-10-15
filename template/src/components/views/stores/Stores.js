import React from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { addLayer, addDataSource } from 'config/cartoSlice';

function Stores() {
  const dispatch = useDispatch();

  dispatch(
    addDataSource({
      id: 'storesSource',
      data:
        'SELECT cartodb_id, zip, storetype, state, the_geom_webmercator FROM mcdonalds',
      credentials: {
        username: 'aasuero',
        apiKey: 'default_public',
        serverUrlTemplate: 'https://{user}.carto.com',
      },
    })
  );
  dispatch(addLayer({ id: 'storesLayer', source: 'storesSource' }));

  return <Outlet />;
}

export default Stores;
