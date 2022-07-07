import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GeoJsonLayer } from '@deck.gl/layers';
import { colorCategories, fetchLayerData } from '@deck.gl/carto';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

import { LEGEND_TYPES } from '@carto/react-ui';

export const STORES_LAYER_ID = 'storesLayer';

const OTHERS_COLOR = { Others: [17, 165, 121] };

export const CATEGORY_COLORS = {
  Supermarket: [80, 20, 85],
  'Discount Store': [128, 186, 90],
  Hypermarket: [231, 63, 116],
  Drugstore: [242, 183, 1],
  'Department Store': [57, 105, 172],
  ...OTHERS_COLOR,
};

const DATA = Object.entries(CATEGORY_COLORS).map((elem) => {
  return { color: elem[1], label: elem[0] };
});

const layerConfig = {
  title: 'Store types',
  visible: true,
  legend: {
    attr: 'storetype',
    type: LEGEND_TYPES.CATEGORY,
    labels: DATA.map((data) => data.label),
    colors: DATA.map((data) => data.color),
  },
};

export default function StoresLayer() {
  const dispatch = useDispatch();
  const { storesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, storesLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  // The CartoLayer only works with dynamic tiles so feature dropping can
  // happen at lower zoom levels. If feature dropping happens, the widgets
  // linked to the same source are not going to work. If we want the widgets
  // to work at all zoom levels, we need to fetch the data in GeoJSON format
  // and then use the GeoJsonLayer intead of the CartoLayer.
  const dataPromise = useMemo(
    () =>
      source?.data &&
      fetchLayerData({
        type: source.type,
        connection: source.connection,
        source: source.data,
        format: 'geojson',
      }),
    [source?.type, source?.data, source?.connection]
  );

  if (storesLayer && source) {
    return new GeoJsonLayer({
      ...cartoLayerProps,
      data: dataPromise,
      dataTransform: (res) => res.data,
      id: STORES_LAYER_ID,
      stroked: true,
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      pickable: true,
      visible: storesLayer.visible,
      getFillColor: colorCategories({
        attr: layerConfig.legend.attr,
        domain: Object.keys(CATEGORY_COLORS),
        colors: Object.values(CATEGORY_COLORS),
        othersColor: OTHERS_COLOR.Others,
      }),
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
