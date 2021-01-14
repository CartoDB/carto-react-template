import { useSelector } from 'react-redux';
import { CartoBQTilerLayer, colorBins } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';

export default function TilesetLayer() {
  const { tilesetLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, tilesetLayer?.source));
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (tilesetLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoFilterProps,
      id: tilesetLayer.id,
      data: source.data,
      credentials: source.credentials,
      stroked: false,
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      pickable: true,
      getFillColor: colorBins({
        attr: 'total_pop',
        domain: [0, 100, 500, 1e3, 1e4, 1e5, 1e6],
        color: 'BlueYl',
      }),
      getRadius: 2,
      onHover: (info) => {
        if (info && info.object) {
          info.object = {
            html: `
              <strong>Total population</strong>
              ${info.object.properties.total_pop}
            `,
          };
        }
      },
    });
  }
}
