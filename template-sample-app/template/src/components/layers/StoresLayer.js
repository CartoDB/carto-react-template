import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartoSQLLayer, colorCategories } from '@deck.gl/carto';
import { useCartoLayerFilterProps } from '@carto/react/api';
import { selectSourceById, updateLayer } from '@carto/react/redux';
import htmlForFeature from 'utils/htmlForFeature';
import rgbToHex from 'utils/rgbToHex';

export const STORES_LAYER_ID = 'storesLayer';

const OTHERS_COLOR = { Others: [17, 165, 121] };

const ATTR = 'storetype';

export const CATEGORY_COLORS = {
  Supermarket: [80, 20, 85],
  'Discount Store': [128, 186, 90],
  Hypermarket: [231, 63, 116],
  Drugstore: [242, 183, 1],
  'Department Store': [57, 105, 172],
  ...OTHERS_COLOR,
};

export const LEGEND = {
  id: STORES_LAYER_ID,
  title: 'Store types',
  visibility: true,
  type: 'category',
  attr: ATTR,
  metadata: null,
  info: 'This is a description',
  data: Object.entries(CATEGORY_COLORS).map((elem) => {
    return { color: rgbToHex(elem[1]), label: elem[0] };
  }),
};

console.log(
  'colorCategories',
  colorCategories({
    attr: 'storetype',
    domain: Object.keys(CATEGORY_COLORS),
    colors: Object.values(CATEGORY_COLORS),
    othersColor: OTHERS_COLOR.Others,
  })
);

function StoresLayer() {
  const navigate = useNavigate();
  const { storesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, storesLayer?.source));
  const cartoFilterProps = useCartoLayerFilterProps(source);
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();

  if (storesLayer && source) {
    return new CartoSQLLayer({
      ...cartoFilterProps,
      id: STORES_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      stroked: true,
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      pickable: true,
      visible: visible,
      getFillColor: colorCategories({
        attr: ATTR,
        domain: Object.keys(CATEGORY_COLORS),
        colors: Object.values(CATEGORY_COLORS),
        // othersColor: OTHERS_COLOR.Others,
      }),
      getLineColor: [0, 0, 0],
      getRadius: (info) =>
        info.properties.store_id === storesLayer.selectedStore ? 6 : 3,
      getLineWidth: (info) =>
        info.properties.store_id === storesLayer.selectedStore ? 2 : 0,
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
      onClick: (info) => {
        if (info?.object) {
          navigate(`/stores/${info.object.properties.store_id}`);
        }
      },
      updateTriggers: {
        ...cartoFilterProps.updateTriggers,
        getRadius: { selectedStore: storesLayer.selectedStore },
        getLineWidth: { selectedStore: storesLayer.selectedStore },
      },
      onDataLoad: (data) => {
        dispatch(
          updateLayer({
            id: STORES_LAYER_ID,
            layerAttributes: { legend: LEGEND, metadata: data },
          })
        );
      },
    });
  }
}

export default StoresLayer;
