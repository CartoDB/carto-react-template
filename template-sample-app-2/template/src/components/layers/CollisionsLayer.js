import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import ExtendedGeoJsonLayer from './miscelanea/extended-geojson-layer/geojson-layer';

export const COLLISIONS_LAYER_ID = 'collisionsLayer';

export default function CollisionsLayer() {
  const { collisionsLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, collisionsLayer?.source));
  const cartoLayerProps = useCartoLayerProps({
    source,
    renderSubLayers: (...args) => new ExtendedGeoJsonLayer(...args),
  });

  if (collisionsLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: COLLISIONS_LAYER_ID,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
      },
    });
  }
}
