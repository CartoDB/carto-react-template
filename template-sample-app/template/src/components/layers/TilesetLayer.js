import { useSelector } from 'react-redux';
import { CartoBQTilerLayer, colorBins } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

export const TILESET_LAYER_ID = 'tilesetLayer';

function TilesetLayer() {
  const { tilesetLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, tilesetLayer?.source));
  const cartoLayerProps = useCartoLayerProps(source);

  if (tilesetLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoLayerProps,
      id: TILESET_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      stroked: false,
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      pickable: true,
      getFillColor: colorBins({
        attr: 'aggregated_total',
        domain: [10, 100, 1e3, 1e4, 1e5, 1e6],
        colors: 'Temps',
      }),
      pointRadiusMinPixels: 2,
      onHover: (info) => {
        if (info && info.object) {
          info.object = {
            html: htmlForFeature({
              title: 'Aggregated total',
              feature: info.object,
              formatter: {
                type: 'number',
                columns: ['aggregated_total'],
              },
              includeColumns: ['aggregated_total'],
            }),
          };
        }
      },
    });
  }
}

export default TilesetLayer;
