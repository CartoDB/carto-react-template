import React, { useEffect } from 'react';
import { retailStoresSource } from 'data/sources/RetailStoresSource.js';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react/redux';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setViewState } from '@carto/react/redux';

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
  }, [dispatch]);

  const LAYER_ID = `storesLayer`;

  useEffect(() => {

    // Add the source
    dispatch(
      addSource(retailStoresSource)
    );

    // Add the layer
    dispatch(
      addLayer({
        id: LAYER_ID,
        source: retailStoresSource.id,
      })
    );

    // Cleanup
    return function cleanup() {
      dispatch(removeLayer(LAYER_ID));
      dispatch(removeSource(retailStoresSource.id));
    };
  }, [dispatch, LAYER_ID]);

  // Auto import useEffect

  return (
    <Outlet />
  );
}
