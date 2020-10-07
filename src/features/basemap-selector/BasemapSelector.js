import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBaseMap } from '../map/mapSlice';

export function BasemapSelector() {
  const baseMaps = useSelector((state) => Object.keys(state.map.baseMaps));
  const selectedBaseMap = useSelector((state) => state.map.baseMap);

  const dispatch = useDispatch();

  return (
    <div>
      <h3>Basemap</h3>
      {baseMaps.map((basemap) => (
        <div key={`basemap-${basemap}`}>
          <input
            id={`basemap-${basemap}`}
            type='radio'
            name='basemap'
            value={basemap}
            defaultChecked={selectedBaseMap === basemap}
            onClick={() => dispatch(setBaseMap(basemap))}
          />
          <label htmlFor={`basemap-${basemap}`}>{basemap}</label>
        </div>
      ))}
    </div>
  );
}
