import React from 'react';
import { useSelector } from 'react-redux';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';

import { TempLayer } from './layers/TempLayer'
import { TipsLayer } from './layers/TipsLayer'

// import {
//   layers
// } from './mapSlice';

export function Map() {

  const viewState = useSelector(state => state.map.viewState)
  const baseMap = useSelector(state => state.map.baseMap)
  // const _layers = useSelector(layers)


  const _layers = [
    TempLayer(),
    TipsLayer()
  ];


  return (
    <DeckGL
      initialViewState={viewState}
      controller={true}
      layers={_layers}
    >
      <StaticMap
        reuseMaps
        mapStyle={baseMap}
        preventStyleDiffing
      />
    </DeckGL>
  );
}
