import { useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoProps } from '@carto/react/api';
import { scaleThreshold } from 'd3-scale';
import { currencyFormatter } from 'utils/formatter';

// CARTO Colors BluYI. https://carto.com/carto-colors/
export const COLORS = [
  [247, 254, 174],
  [183, 230, 165],
  [124, 203, 162],
  [70, 174, 160],
  [4, 82, 117],
];

const BREAKS = [0, 25, 50, 75, 100];

const INDEX_COLOR_SCALE = scaleThreshold().domain(BREAKS).range(COLORS);

function getFillColor(f) {
  return INDEX_COLOR_SCALE(f.properties.avg_fare_amount);
}

export default function TaxisLayer() {
  const { taxisLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, taxisLayer?.source));
  const DEFAULT_PROPS = useCartoProps(source);

  if (taxisLayer && source) {
    return new CartoBQTilerLayer({
      ...DEFAULT_PROPS,
      id: taxisLayer.id,
      data: source.data,
      credentials: source.credentials,
      stroked: false,
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      pickable: true,
      getFillColor: getFillColor,
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
