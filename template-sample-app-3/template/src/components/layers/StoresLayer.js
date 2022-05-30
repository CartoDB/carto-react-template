import { useSelector, useDispatch } from 'react-redux';
import { CartoLayer, colorCategories } from '@deck.gl/carto';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

import { LEGEND_TYPES } from '@carto/react-ui';

export const STORES_LAYER_ID = 'storesLayer';

export const LAYER_OPTIONS = {
  PALETTE_SELECTOR: 'PALETTE_SELECTOR',
};

const OTHERS_KEY = 'Others';
const OTHERS_COLOR = [17, 165, 121];

const CATEGORIES = [
  'Supermarket',
  'Discount Store',
  'Hypermarket',
  'Drugstore',
  'Department Store',
];

const DEFAULT_COLORS = [
  [80, 20, 85],
  [128, 186, 90],
  [231, 63, 116],
  [242, 183, 1],
  [57, 105, 172],
];

const ALT_COLORS = DEFAULT_COLORS.map((c) => c.slice().reverse());

export const PALETTE_OPTIONS = [
  { label: 'Default', value: DEFAULT_COLORS },
  { label: 'Alt', value: ALT_COLORS },
];

const layerConfig = {
  title: 'Store types',
  visible: true,
  opacity: 1,
  showOpacityControl: true,
  options: [LAYER_OPTIONS.PALETTE_SELECTOR],
  legend: {
    attr: 'storetype',
    type: LEGEND_TYPES.CATEGORY,
    labels: [...CATEGORIES, OTHERS_KEY],
    colors: [...DEFAULT_COLORS, OTHERS_COLOR],
  },
};

export default function StoresLayer() {
  const dispatch = useDispatch();
  const { storesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, storesLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });
  const palette = storesLayer?.palette || PALETTE_OPTIONS[0];

  if (storesLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: STORES_LAYER_ID,
      stroked: true,
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      pickable: true,
      visible: storesLayer.visible,
      getFillColor: colorCategories({
        attr: layerConfig.legend.attr,
        domain: [...CATEGORIES, OTHERS_KEY],
        colors: [...palette.value, OTHERS_COLOR],
        othersColor: OTHERS_COLOR,
      }),
      updateTriggers: {
        ...cartoLayerProps.updateTriggers,
        getFillColor: [palette],
      },
      getLineColor: [0, 0, 0],
      getPointRadius: 3,
      getLineWidth: 0,
      onDataLoad: (data) => {
        dispatch(
          updateLayer({
            id: STORES_LAYER_ID,
            layerAttributes: { ...layerConfig },
          })
        );
        cartoLayerProps.onDataLoad && cartoLayerProps.onDataLoad(data);
      },
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature({
              title: `Store ${info.object.properties.store_id}`,
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
