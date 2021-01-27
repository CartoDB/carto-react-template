import React, { useEffect } from 'react';
import storesSource from 'data/sources/storesSource';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react/redux';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setViewState } from '@carto/react/redux';
import { STORES_LAYER_ID } from 'components/layers/StoresLayer';

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

  useEffect(() => {
    // Add the source
    dispatch(addSource(storesSource));

    // Add the layer
    dispatch(
      addLayer({
        id: STORES_LAYER_ID,
        source: storesSource.id,
      })
    );
    // Add layer
    dispatch(addLayer({ id: STORES_LAYER_ID, source: storesSource.id }));

    // Cleanup
    return function cleanup() {
      dispatch(removeLayer(STORES_LAYER_ID));
      dispatch(removeSource(storesSource.id));
    };
  }, [dispatch]);

  // Auto import useEffect

  return <Outlet />;
}
