import { useSelector } from 'react-redux';
import { CartoBQTilerLayer, colorBins } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';

export const TILESET_LAYER_ID = 'tilesetLayer';

export default function TilesetLayer() {
  const { tilesetLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, tilesetLayer?.source));
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (tilesetLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoFilterProps,
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
            html: `
              <strong>Aggregated total</strong><br>
              ${info.object.properties.aggregated_total}
            `,
          };
        }
      },
    });
  }
}
