import React from 'react';
import { useSelector } from 'react-redux';
import { LayerStyle as StoreLayerStyle } from './layers/StoresLayer';
import { LayerStyle as RevenueByStateLayerStyle } from './layers/RevenueByStateLayer';
import { CategoryLegendUI } from 'lib/react-ui/index';

export function Legend(props) {
  const styles = {};
  styles[StoreLayerStyle.id] = StoreLayerStyle;
  styles[RevenueByStateLayerStyle.id] = RevenueByStateLayerStyle;

  const layers = useSelector((state) => Object.keys(state.carto.layers));

  return (
    <div style={props.style}>
      {layers.map(
        (layerId) =>
          styles[layerId] && (
            <CategoryLegendUI key={layerId} categories={styles[layerId]} />
          )
      )}
    </div>
  );
}
