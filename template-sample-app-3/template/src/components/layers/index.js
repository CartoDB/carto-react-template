import StoresLayer from './StoresLayer';
import TilesetLayer from './TilesetLayer';
import { FeatureSelectionLayer } from '@carto/react-widgets';
// [hygen] Import layers

export const getLayers = () => {
  return [
    StoresLayer(),
    TilesetLayer(),
    FeatureSelectionLayer(),
    // [hygen] Add layer
  ];
};
