import React from 'react';
import { useSelector } from 'react-redux';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';

import { TempLayer } from './layers/TempLayer'
import { TipsLayer } from './layers/TipsLayer'


export function Map() {

  const viewState = useSelector(state => state.map.viewState)
  const baseMap = useSelector(state => state.map.baseMap)


  const layers = [
    TempLayer(),
    TipsLayer()
  ];


  return (
    <DeckGL
      initialViewState={viewState}
      controller={true}
      layers={layers}
    >
      <StaticMap
        reuseMaps
        mapStyle={baseMap}
        preventStyleDiffing
      />
    </DeckGL>
  );
}
