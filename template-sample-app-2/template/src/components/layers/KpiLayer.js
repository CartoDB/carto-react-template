import { useSelector, useDispatch } from 'react-redux';
import { CartoLayer, colorBins } from '@deck.gl/carto';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { LEGEND_TYPES } from '@carto/react-ui';

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
  '> $1.5B',
];

const layerConfig = {
  title: 'State analysis',
  visible: true,
  legend: {
    attr: 'revenue',
    type: LEGEND_TYPES.CATEGORY,
    labels: LABELS,
    colors: COLORS,
  },
};

function KpiLayer() {
  const dispatch = useDispatch();
  const { kpiLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, kpiLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (kpiLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: KPI_LAYER_ID,
      getFillColor: colorBins({
        attr: layerConfig.legend.attr,
        domain: [100e6, 500e6, 1e9, 1.5e9],
        colors: COLORS,
      }),
      getLineColor: [255, 255, 255],
      getLineWidth: 1,
      lineWidthMinPixels: 1,
      pickable: true,
      visible: kpiLayer.visible,
      onDataLoad: (data) => {
        dispatch(
          updateLayer({
            id: KPI_LAYER_ID,
            layerAttributes: { ...layerConfig },
          })
        );
        cartoLayerProps.onDataLoad && cartoLayerProps.onDataLoad(data);
      },
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
    });
  }
}

export default KpiLayer;
