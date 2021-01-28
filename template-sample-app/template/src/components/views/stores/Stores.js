import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLayer, removeLayer, addSource, removeSource, setViewState } from '@carto/react/redux';
import { Outlet } from 'react-router-dom';
import { STORES_LAYER_ID } from 'components/layers/StoresLayer';
import storesSource from 'data/sources/storesSource';

export default function Stores() {
  const dispatch = useDispatch();

  useEffect(() => {
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
    dispatch(addSource(storesSource));

    dispatch(
      addLayer({
        id: STORES_LAYER_ID,
        source: storesSource.id,
      })
    );

    dispatch(addLayer({ id: STORES_LAYER_ID, source: storesSource.id }));

    return function cleanup() {
      dispatch(removeLayer(STORES_LAYER_ID));
      dispatch(removeSource(storesSource.id));
    };
  }, [dispatch]);

  // Auto import useEffect

  return <Outlet />;
}
