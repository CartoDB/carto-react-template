import { useSelector, useDispatch } from 'react-redux';
import { CartoLayer, colorBins } from '@deck.gl/carto';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { LEGEND_TYPES } from '@carto/react-ui';
import hexToRGB from 'utils/hexToRgb';

export const TILESET_LAYER_ID = 'tilesetLayer';

const COLORS = [
  '#009392',
  '#39b185',
  '#9ccb86',
  '#e9e29c',
  '#eeb479',
  '#e88471',
  '#cf597e',
];

const COLORS_RGB = COLORS.map((color) => hexToRGB(color));

const LABELS = [10, 100, 1e3, 1e4, 1e5, 1e6];

const layerConfig = {
  title: 'OSM Buildings',
  visible: true,
  legend: {
    attr: 'aggregated_total',
    type: LEGEND_TYPES.BINS,
    labels: LABELS,
    colors: COLORS,
  },
};

function TilesetLayer() {
  const dispatch = useDispatch();
  const { tilesetLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, tilesetLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (tilesetLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: TILESET_LAYER_ID,
      stroked: false,
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      pickable: true,
      visible: tilesetLayer.visible,
      getFillColor: colorBins({
        attr: layerConfig.legend.attr,
        domain: LABELS,
        colors: COLORS_RGB,
      }),
      pointRadiusMinPixels: 2,
      onDataLoad: (data) => {
        dispatch(
          updateLayer({
            id: TILESET_LAYER_ID,
            layerAttributes: { ...layerConfig },
          })
        );
      },
      onHover: (info) => {
        if (info && info.object) {
          info.object = {
            html: htmlForFeature({
              title: 'Aggregated total',
              feature: info.object,
              formatter: {
                type: 'number',
                columns: ['aggregated_total'],
              },
              includeColumns: ['aggregated_total'],
            }),
          };
        }
      },
    });
  }
}

export default TilesetLayer;
