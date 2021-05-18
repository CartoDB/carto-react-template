import { useSelector } from 'react-redux';
import { CartoLayer, colorBins } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';

export const GEOJSON_LAYER_ID = 'geoJSONLayer';

function GeoJSONLayer() {
  const { geoJSONLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, geoJSONLayer?.source));
  const cartoLayerProps = useCartoLayerProps(source);

  if (geoJSONLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: GEOJSON_LAYER_ID,
      getFillColor: colorBins({
        attr: 'total_pop',
        domain: [0.25e7, 0.5e7, 0.75e7, 1e7, 1.25e7, 1.5e7],
        colors: 'Temps',
      }),
    });
  }
}

export default GeoJSONLayer;
