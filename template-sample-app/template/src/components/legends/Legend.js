import React from 'react';
import { useSelector } from 'react-redux';
import { LayerStyle as StoreLayerStyle } from 'components/layers/StoresLayer';
import { LayerStyle as KpiLayerStyle } from 'components/layers/KpiLayer';
import LegendUI from './LegendUI';

export function Legend(props) {
  const styles = {};
  styles[StoreLayerStyle.id] = StoreLayerStyle;
  styles[KpiLayerStyle.id] = KpiLayerStyle;

  const layers = useSelector((state) => Object.keys(state.carto.layers));

  return (
    <div style={props.style} className={props.className}>
      {layers.map(
        (layerId) =>
          styles[layerId] && <LegendUI key={layerId} categories={styles[layerId]} />
      )}
    </div>
  );
}
