import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBaseMap } from '../map/mapSlice';

export function BasemapSelector() {
  const selectedBaseMap = useSelector((state) => state.map.baseMap);
  const dispatch = useDispatch();

  const BASEMAPS = [
    {
      type: 'mapbox',
      name: 'positron',
      options: {
        mapStyle: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      },
    },
    {
      type: 'mapbox',
      name: 'voyager',
      options: {
        mapStyle: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
      },
    },
    {
      type: 'mapbox',
      name: 'dark matter',
      options: {
        mapStyle: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      },
    },
    {
      type: 'gmaps',
      name: 'gmaps-roadmap',
      apiKey: 'GOOGLE_MAPS_API_KEY',
      options: {
        mapTypeId: 'roadmap',
      },
    },
    {
      type: 'gmaps',
      name: 'gmaps-satellite',
      apiKey: 'GOOGLE_MAPS_API_KEY',
      options: {
        mapTypeId: 'satellite',
      },
    },
    {
      type: 'gmaps',
      name: 'gmaps-hybrid',
      apiKey: 'GOOGLE_MAPS_API_KEY',
      options: {
        mapTypeId: 'hybrid',
      },
    },
    {
      type: 'gmaps',
      name: 'gmaps-terrain',
      apiKey: 'GOOGLE_MAPS_API_KEY',
      options: {
        mapTypeId: 'terrain',
      },
    },
  ];

  return (
    <div>
      <h3>Basemap</h3>
      {BASEMAPS.map((basemap) => (
        <div key={`basemap-${basemap.name}`}>
          <input
            id={`basemap-${basemap.name}`}
            type='radio'
            name='basemap'
            value={basemap}
            defaultChecked={selectedBaseMap.name === basemap.name}
            onClick={() => dispatch(setBaseMap(basemap))}
          />
          <label htmlFor={`basemap-${basemap.name}`}>{basemap.name}</label>
        </div>
      ))}
    </div>
  );
}
