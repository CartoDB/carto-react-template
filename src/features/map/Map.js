import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';

import { setViewState } from './mapSlice';
import { GoogleMap } from './GoogleMap';
import { TempLayer } from './layers/TempLayer';
import { TipsLayer } from './layers/TipsLayer';

export function Map() {
  const viewState = useSelector((state) => state.map.viewState);
  const baseMap = useSelector((state) => state.map.baseMap);
  const dispatch = useDispatch();

  const layers = [TempLayer(), TipsLayer()];

  let handleViewStateChange = ({ viewState: nextViewState }) => {
    dispatch(setViewState(nextViewState));
  };
  handleViewStateChange = handleViewStateChange.bind(this);

  if (baseMap.type === 'mapbox') {
    return (
      <DeckGL
        viewState={viewState}
        controller={true}
        layers={layers}
        onViewStateChange={handleViewStateChange}
      >
        <StaticMap reuseMaps mapStyle={baseMap.options.mapStyle} preventStyleDiffing />
      </DeckGL>
    );
  } else if (baseMap.type === 'gmaps') {
    return (
      <GoogleMap
        baseMap={baseMap}
        viewState={viewState}
        layers={layers}
        onViewStateChange={handleViewStateChange}
      ></GoogleMap>
    );
  } else {
    return <div>Not a valid map provider</div>;
  }
}
