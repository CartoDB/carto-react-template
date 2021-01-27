import React, { useEffect } from 'react';
import storesSource from 'data/sources/storesSource';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react/redux';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setViewState } from '@carto/react/redux';

export default function Stores() {
  const dispatch = useDispatch();

  useEffect(() => {
    const LAYER_ID = `storesLayer`;

    dispatch(
      setViewState({
        latitude: 31.802892,
        longitude: -103.007813,
        zoom: 3,
        transitionDuration: 500,
      })
    );

    dispatch(addSource(storesSource));
    dispatch(addLayer({ id: LAYER_ID, source: storesSource.id }));

    return function cleanup() {
      dispatch(removeLayer(LAYER_ID));
      dispatch(removeSource(storesSource.id));
    };
  }, [dispatch]);

  return <Outlet />;
}
