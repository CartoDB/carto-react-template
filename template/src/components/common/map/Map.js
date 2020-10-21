import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';

import { setViewState } from 'config/cartoSlice';
import { baseMaps } from 'config/baseMaps';
import { GoogleMap } from './GoogleMap';
import { StoresLayer } from './layers/StoresLayer';
import { RevenueByStateLayer } from './layers/RevenueByStateLayer';

export function Map() {
  const viewState = useSelector((state) => state.carto.viewState);
  const [extraViewState, setExtraViewState] = useState({});
  const baseMap = useSelector((state) => baseMaps[state.carto.baseMap]);
  const dispatch = useDispatch();

  const layers = [StoresLayer(), RevenueByStateLayer()];

  const handleViewStateChange = ({ viewState }) => {
    const {
      longitude,
      latitude,
      zoom,
      pitch,
      bearing,
      transitionDuration,
      ...others
    } = viewState;
    setExtraViewState(others);
    dispatch(
      setViewState({ longitude, latitude, zoom, pitch, bearing, transitionDuration })
    );
  };

  const handleSizeChange = ({ width, height }) => {
    dispatch(setViewState({ width, height }));
  };

  if (baseMap.type === 'mapbox') {
    return (
      <DeckGL
        viewState={{ ...viewState, ...extraViewState }}
        controller={true}
        layers={layers}
        onViewStateChange={handleViewStateChange}
        onResize={handleSizeChange}
        getTooltip={({ object }) => object}
      >
        <StaticMap reuseMaps mapStyle={baseMap.options.mapStyle} preventStyleDiffing />
      </DeckGL>
    );
  } else if (baseMap.type === 'gmaps') {
    return (
      <GoogleMap
        baseMap={baseMap}
        viewState={{ ...viewState, ...extraViewState }}
        layers={layers}
        onViewStateChange={handleViewStateChange}
        onResize={handleSizeChange}
      ></GoogleMap>
    );
  } else {
    return <div>Not a valid map provider</div>;
  }
}
