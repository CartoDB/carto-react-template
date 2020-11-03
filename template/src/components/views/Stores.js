import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { addDataSource, removeLayer, removeDataSource } from 'config/cartoSlice';

export default function Stores() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Add the source to be used in child components (StoreList and StoreDetail)
    dispatch(
      addDataSource({
        id: 'storesSource',
        data:
          'SELECT store_id, zip, storetype, state, revenue, the_geom_webmercator FROM mcdonalds',
      })
    );

    return function cleanup() {
      dispatch(removeLayer('storesLayer'));
      dispatch(removeDataSource('storesSource'));
    };
  });

  return <Outlet />;
}
