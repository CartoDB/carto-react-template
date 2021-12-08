import { useSelector, useDispatch } from 'react-redux';
import { CartoLayer, colorBins } from '@deck.gl/carto';
import { selectSourceById, updateLayer, addSpatialFilter } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { LEGEND_TYPES } from '@carto/react-ui';
import ExtendedGeoJsonLayer from './miscelanea/extended-geojson-layer/geojson-layer';
import { useEffect } from 'react';

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

  if (kpiLayer && source) {
    return [
      new ExtendedGeoJsonLayer({
        id: 'spatial',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
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
              properties: {},
            },
          ],
        },
      }),
      new CartoLayer({
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
          cartoLayerProps?.onDataLoad && cartoLayerProps.onDataLoad(data);
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
      }),
    ];
  }
}

export default KpiLayer;
