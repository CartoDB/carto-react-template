import React from 'react';
import { useSelector } from 'react-redux';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { CartoSQLLayer } from '@deck.gl/carto';

export function Map() {

  const viewState = useSelector(state => state.map.viewState)
  const baseMap = useSelector(state => state.map.baseMap)

  const layersConfig = useSelector(state => state.map.layers)
  const layers = Object.keys(layersConfig).map(l => {
    return new CartoSQLLayer(layersConfig[l]);
  })

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
