import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBaseMap } from 'app/cartoSlice';
import { baseMaps } from 'app/baseMaps'

export function BasemapSelector() {
  const selectedBaseMap = useSelector((state) => state.carto.baseMap);

  const dispatch = useDispatch();

  return (
    <div>
      <h3>Basemap</h3>
      {Object.keys(baseMaps).map((basemap) => (
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
