import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { DataFilterExtension } from '@deck.gl/extensions';
import { filterApplicator, useRenderedFeatures } from '@carto/react/api';
import { selectSourceById } from '@carto/react/redux';
import { scaleThreshold } from 'd3-scale';
import { currencyFormatter } from 'utils/formatter';
import { debounce } from 'utils/debounce';

// CARTO Colors BluYI. https://carto.com/carto-colors/
export const COLORS = [
  [247, 254, 174],
  [183, 230, 165],
  [124, 203, 162],
  [70, 174, 160],
  [4, 82, 117],
];
export const LABELS = [
  '< $100M',
  '$100M - $500M',
  '$500M - $1B',
  '$1B - $1.5B',
  '> $1.5',
];
const BREAKS = [100e6, 500e6, 1e9, 1.5e9];

const INDEX_COLOR_SCALE = scaleThreshold().domain(BREAKS).range(COLORS);

function getFillColor(f) {
  return INDEX_COLOR_SCALE(f.properties.revenue);
}

export default function KpiLayer() {
  const { kpiLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, kpiLayer?.source));
  const [onViewportChange] = useRenderedFeatures(source?.id);

  if (kpiLayer && source) {
    return new CartoSQLLayer({
      id: kpiLayer.id,
      data: source.data,
      credentials: source.credentials,
      getFillColor: getFillColor,
      getLineColor: [255, 255, 255],
      getLineWidth: 1,
      lineWidthMinPixels: 1,
      pickable: true,
      onHover: (info) => {
        if (info && info.object) {
          const formattedRevenue = currencyFormatter(info.object.properties.revenue);
          info.object = {
            html: `
              <strong>${info.object.properties.name}</strong><br>
              ${formattedRevenue.prefix}${formattedRevenue.value}
            `,
          };
        }
      },
      onViewportChange: debounce(onViewportChange, 500),
      getFilterValue: (row) =>
        source.filters ? filterApplicator(row, source.filters) : 1,
      filterRange: [1, 1],
      extensions: [new DataFilterExtension({ filterSize: 1 })],
      updateTriggers: {
        getFilterValue: source.filters,
      },
    });
  }
}
