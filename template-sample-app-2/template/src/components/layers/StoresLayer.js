import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartoLayer, colorCategories } from '@deck.gl/carto';
import { useCartoLayerProps } from '@carto/react-api';
import { selectSourceById, updateLayer, addSpatialFilter } from '@carto/react-redux';
import htmlForFeature from 'utils/htmlForFeature';
import { LEGEND_TYPES } from '@carto/react-ui';
import ExtendedGeoJsonLayer from 'components/layers/miscelanea/extended-geojson-layer/geojson-layer';

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

function StoresLayer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { storesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, storesLayer?.source));
  const cartoLayerProps = useCartoLayerProps({
    source,
    renderSubLayers: (...args) => new ExtendedGeoJsonLayer(...args),
  });

  useEffect(() => {
    if (source?.id) {
      dispatch(
        addSpatialFilter({
          id: source.id,
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-90.5712890625, 43.389081939117496],
                [-97.6025390625, 40.613952441166596],
                [-87.9345703125, 36.98500309285596],
                [-82.79296874999999, 37.92686760148135],
                [-83.4521484375, 40.27952566881291],
                [-84.990234375, 42.19596877629178],
                [-89.6484375, 40.01078714046552],
                [-90.5712890625, 43.389081939117496],
              ],
            ],
          },
        })
      );
    }
  }, [dispatch, source?.id]);

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
        domain: Object.keys(CATEGORY_COLORS),
        colors: Object.values(CATEGORY_COLORS),
        othersColor: OTHERS_COLOR.Others,
      }),
      getLineColor: [0, 0, 0],
      getPointRadius: 3,
      // getPointRadius: (info) =>
      //   info.properties.store_id === storesLayer.selectedStore ? 6 : 3,
      getLineWidth: 0,
      // getLineWidth: (info) =>
      //   info.properties.store_id === storesLayer.selectedStore ? 2 : 0,
      onDataLoad: (data) => {
        dispatch(
          updateLayer({
            id: STORES_LAYER_ID,
            layerAttributes: { ...layerConfig },
          })
        );
        cartoLayerProps?.onDataLoad && cartoLayerProps.onDataLoad(data);
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
      onClick: (info) => {
        if (info?.object) {
          navigate(`/stores/${info.object.properties.store_id}`);
        }
      },
      updateTriggers: {
        // getPointRadius: [storesLayer.selectedStore],
        // getLineWidth: [storesLayer.selectedStore],
        ...cartoLayerProps.updateTriggers,
      },
    });
  }
}

export default StoresLayer;
