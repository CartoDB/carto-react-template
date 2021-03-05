import { useSelector, useDispatch } from 'react-redux';
import { CartoSQLLayer, colorBins } from '@deck.gl/carto';
import { selectSourceById, updateLayer } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import htmlForFeature from 'utils/htmlForFeature';
import rgbToHex from 'utils/rgbToHex';

export const KPI_LAYER_ID = 'kpiLayer';

const ATTR = 'revenue';

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
  '> $1.5B',
];

export const LEGEND_KPI = {
  id: KPI_LAYER_ID,
  title: 'State analysis',
  visibility: true,
  type: 'category',
  attr: ATTR,
  metadata: null,
  info: 'This is a description',
  data: Object.entries(LABELS).map((elem, i) => {
    return { color: rgbToHex(COLORS[i]), label: elem };
  }),
};

function KpiLayer() {
  const { kpiLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, kpiLayer?.source));
  const cartoFilterProps = useCartoLayerFilterProps(source);
  const dispatch = useDispatch();

  if (kpiLayer && source) {
    return new CartoSQLLayer({
      ...cartoFilterProps,
      id: KPI_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      getFillColor: colorBins({
        attr: ATTR,
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
      onDataLoad: (data) => {
        dispatch(
          updateLayer({
            id: KPI_LAYER_ID,
            layerAttributes: { legend: LEGEND_KPI, metadata: data },
          })
        );
      },
    });
  }
}

export default KpiLayer;
