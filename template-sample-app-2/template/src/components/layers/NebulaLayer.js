import { EditableGeoJsonLayer } from '@nebula.gl/layers';
import { DrawPolygonMode, ViewMode, TranslateMode } from '@nebula.gl/edit-modes';
import { useState } from 'react';
import { addSpatialFilter, selectSpatialFilter } from '@carto/react-redux';
import { useDispatch, useSelector } from 'react-redux';

const INITIAL_STATE = {
  type: 'FeatureCollection',
  features: [
    // {
    //   type: 'Feature',
    //   geometry: {
    //     type: 'Polygon',
    //     coordinates: [
    //       [
    //         [-90.5712890625, 43.389081939117496],
    //         [-97.6025390625, 40.613952441166596],
    //         [-87.9345703125, 36.98500309285596],
    //         [-82.79296874999999, 37.92686760148135],
    //         [-83.4521484375, 40.27952566881291],
    //         [-84.990234375, 42.19596877629178],
    //         [-89.6484375, 40.01078714046552],
    //         [-90.5712890625, 43.389081939117496],
    //       ],
    //     ],
    //   },
    //   properties: {},
    // },
  ],
};

export default function NebulaLayer() {
  const dispatch = useDispatch();
  const spatialFilterGeometry = useSelector((state) => selectSpatialFilter(state));

  const data = {
    type: 'FeatureCollection',
    features: spatialFilterGeometry
      ? [{ type: 'Feature', geometry: spatialFilterGeometry, properties: {} }]
      : [],
  };

  return new EditableGeoJsonLayer({
    id: 'nebula-layer',
    data,
    mode: data.features.length ? TranslateMode : DrawPolygonMode,
    selectedFeatureIndexes: [0],
    onEdit: ({ updatedData }) => {
      if (updatedData.features[0]?.geometry) {
        dispatch(
          addSpatialFilter({
            geometry: updatedData.features[0]?.geometry,
          })
        );
      }
    },
  });
}
