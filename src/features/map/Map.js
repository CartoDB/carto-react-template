import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';

import { setViewState } from 'app/cartoSlice';
import { baseMaps } from 'app/baseMaps'
import { GoogleMap } from './GoogleMap';
import { CountryLayer } from './layers/CountryLayer'
import { TempLayer } from './layers/TempLayer';
import { TipsLayer } from './layers/TipsLayer';

export function Map() {
  const viewState = useSelector((state) => state.carto.viewState);
  const [extraViewState, setExtraViewState] = useState({});
  const baseMap = useSelector((state) => baseMaps[state.carto.baseMap]);
  const dispatch = useDispatch();

  const layers = [CountryLayer(), TempLayer(), TipsLayer()];

  const handleViewStateChange = ({ viewState }) => {
    const { longitude, latitude, zoom, pitch, bearing, ...others } = viewState;
    setExtraViewState(others);
    dispatch(setViewState({ longitude, latitude, zoom, pitch, bearing }));
  };

  if (baseMap.type === 'mapbox') {
    return (
      <DeckGL
        viewState={{...viewState, ...extraViewState}}
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
        viewState={{...viewState, ...extraViewState}}
        layers={layers}
        onViewStateChange={handleViewStateChange}
      ></GoogleMap>
    );
  } else {
    return <div>Not a valid map provider</div>;
  }
}
