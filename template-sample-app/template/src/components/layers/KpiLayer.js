import { useSelector } from 'react-redux';
import { CartoSQLLayer, colorBins } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import { currencyFormatter } from 'utils/formatter';

export const KPI_LAYER_ID = 'kpiLayer';

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

export default function KpiLayer() {
  const { kpiLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, kpiLayer?.source));
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (kpiLayer && source) {
    return new CartoSQLLayer({
      ...cartoFilterProps,
      id: KPI_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      getFillColor: colorBins({
        attr: 'revenue',
        domain: [100e6, 500e6, 1e9, 1.5e9],
        colors: COLORS,
      }),
      getLineColor: [255, 255, 255],
      getLineWidth: 1,
      lineWidthMinPixels: 1,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          const formattedRevenue = currencyFormatter(info.object.properties.revenue);
          info.object = {
            html: `
              <strong>${info.object.properties.name}</strong><br>
              ${formattedRevenue.prefix}${formattedRevenue.value}
            `,
          };
        }
      },
    });
  }
}
