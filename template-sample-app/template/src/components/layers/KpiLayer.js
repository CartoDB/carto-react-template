import { useSelector } from 'react-redux';
import { CartoLayer, colorBins, MAP_TYPES } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

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

function KpiLayer() {
  const { kpiLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, kpiLayer?.source));
  const cartoLayerProps = useCartoLayerProps(source);

  if (kpiLayer && source) {
    return new CartoLayer({
      id: KPI_LAYER_ID,
      data: source.data,
      type: MAP_TYPES.SQL,
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
          info.object = {
            html: htmlForFeature({
              title: `${info.object.properties.name}`,
              feature: info.object,
              formatter: {
                type: 'currency',
                columns: ['revenue'],
              },
              includeColumns: ['revenue'],
              showColumnName: false,
            }),
          };
        }
      },
      ...cartoLayerProps,
    });
  }
}

export default KpiLayer;
