import { EditableGeoJsonLayer } from '@nebula.gl/layers';
import { DrawPolygonMode, TranslateMode } from '@nebula.gl/edit-modes';
import { addSpatialFilter, selectSpatialFilter } from '@carto/react-redux';
import { useDispatch, useSelector } from 'react-redux';

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
