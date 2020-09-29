import React from 'react';
import { useSelector } from 'react-redux';
import DeckGL from '@deck.gl/react';
import {StaticMap} from 'react-map-gl';

export function Map() {

  const viewState = useSelector(state => state.map.viewState)
  const baseMap = useSelector(state => state.map.baseMap)

  return (
    <DeckGL
      initialViewState={viewState}
      controller={true}
    >
      <StaticMap
        reuseMaps
        mapStyle={baseMap}
        preventStyleDiffing
      />
    </DeckGL>
  );
}
