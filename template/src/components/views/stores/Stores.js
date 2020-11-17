import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLayer, ADD_LAYER, setViewState } from 'lib/sdk/slice/cartoSlice';
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
      {
        type: 'carto/addSource',
        payload: {
          id: SOURCE_ID,
          data:
            'SELECT store_id, zip, storetype, state, revenue, the_geom_webmercator FROM mcdonalds',
        },
      }
      // addSource({
      //   id: SOURCE_ID,
      //   data:
      //     'SELECT store_id, zip, storetype, state, revenue, the_geom_webmercator FROM mcdonalds',
      // })
    );
    // Add layer
    // dispatch(addLayer({ id: LAYER_ID, source: SOURCE_ID, selectedStore: null }));
    // dispatch({
    //   type: ADD_LAYER,
    //    payload: { id: LAYER_ID, source: SOURCE_ID, selectedStore: null }
    // })
    dispatch(addLayer({ id: LAYER_ID, source: SOURCE_ID, selectedStore: null }));

    // Clean up when leave
    return function cleanup() {
      dispatch({
        type: 'carto/removeLayer',
        payload: LAYER_ID,
      });
      dispatch({
        type: 'carto/removeSource',
        payload: LAYER_ID,
      });
      // dispatch(removeLayer(LAYER_ID));
      // dispatch(removeSource(SOURCE_ID));
    };
  }, [dispatch]);

  return <Outlet />;
}
