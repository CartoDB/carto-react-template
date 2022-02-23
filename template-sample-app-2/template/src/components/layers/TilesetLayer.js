import { useSelector, useDispatch } from 'react-redux';
import { CartoLayer, colorBins } from '@deck.gl/carto';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { LEGEND_TYPES } from '@carto/react-ui';

export const TILESET_LAYER_ID = 'tilesetLayer';

const COLORS = [
  [0, 147, 146],
  [57, 177, 133],
  [156, 203, 134],
  [233, 226, 156],
  [238, 180, 121],
  [232, 132, 113],
  [207, 89, 126],
];

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
        colors: COLORS,
      }),
      pointRadiusMinPixels: 2,
      onDataLoad: (data) => {
        dispatch(
          updateLayer({
            id: TILESET_LAYER_ID,
            layerAttributes: { ...layerConfig },
          })
        );
        cartoLayerProps.onDataLoad && cartoLayerProps.onDataLoad(data);
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
