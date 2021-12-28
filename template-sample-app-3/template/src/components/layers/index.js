import StoresLayer from './StoresLayer';
import TilesetLayer from './TilesetLayer';
import { DrawingToolLayer } from '@carto/react-widgets';
// [hygen] Import layers

export const getLayers = () => {
  return [
    StoresLayer(),
    TilesetLayer(),
    DrawingToolLayer(),
    // [hygen] Add layer
  ];
};
