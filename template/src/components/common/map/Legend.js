import React from 'react';
import { useSelector } from 'react-redux';
import { LayerStyle as StoreLayerStyle } from './layers/StoresLayer';
import { CategoryLegendUI } from 'lib/react-ui/index';

export function Legend(props) {
  const styles = {};
  styles[StoreLayerStyle.id] = StoreLayerStyle;

  const layers = useSelector((state) => Object.keys(state.carto.layers));

  return (
    <div style={props.style}>
      {layers.map((layerId) => (
        <CategoryLegendUI key={layerId} categories={styles[layerId]} />
      ))}
    </div>
  );
}
