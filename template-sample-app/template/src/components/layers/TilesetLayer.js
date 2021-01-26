import { useSelector } from 'react-redux';
import { CartoBQTilerLayer, colorBins } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import { currencyFormatter } from 'utils/formatter';

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
        attr: 'avg_fare_amount',
        domain: [0, 10, 20, 40, 60, 80, 90, 100],
        colors: 'TealGrn',
      }),
      getRadius: 2,
      onHover: (info) => {
        if (info && info.object) {
          const formatted = {
            amount: currencyFormatter(info.object.properties.avg_fare_amount),
            tip: currencyFormatter(info.object.properties.avg_tip_percentage),
          };

          info.object = {
            html: `
              <strong>Avg fare amount</strong>
              ${formatted.amount.prefix}${formatted.amount.value}<br>
              <strong>Avg tip percentage</strong>
              ${formatted.tip.prefix}${formatted.tip.value}
            `,
          };
        }
      },
    });
  }
}
