import { useSelector } from 'react-redux';
import { CartoLayer, colorBins } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

export const GEOJSON_LAYER_ID = 'geojsonLayer';

function GeojsonLayer() {
  const { geojsonLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, geojsonLayer?.source));
  const cartoLayerProps = useCartoLayerProps(source);

  if (geojsonLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: GEOJSON_LAYER_ID,
      getFillColor: colorBins({
        attr: 'total_pop',
        domain: [0.25e7, 0.5e7, 0.75e7, 1e7, 1.25e7, 1.5e7],
        colors: 'Temps',
      }),
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

export default GeojsonLayer;
