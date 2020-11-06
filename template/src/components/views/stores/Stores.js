import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setViewState,
  addLayer,
  addSource,
  removeLayer,
  removeSource,
} from 'config/cartoSlice';
import { Outlet } from 'react-router-dom';
import { SOURCE_ID, LAYER_ID } from './constants';

export default function Stores() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Change zoom
    dispatch(
      setViewState({
        latitude: 31.802892,
        longitude: -103.007813,
        zoom: 3,
        transitionDuration: 500,
      })
    );
    // Add stores source
    dispatch(
      addSource({
        id: SOURCE_ID,
        data:
          'SELECT store_id, zip, storetype, state, revenue, the_geom_webmercator FROM mcdonalds',
      })
    );
    // Add layer
    dispatch(addLayer({ id: LAYER_ID, source: SOURCE_ID, selectedStore: null }));

    // Clean up when leave
    return function cleanup() {
      dispatch(removeLayer(LAYER_ID));
      dispatch(removeSource(SOURCE_ID));
    };
  }, [dispatch]);

  return <Outlet />;
}
