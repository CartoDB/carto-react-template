import StoresLayer from './StoresLayer';
import TilesetLayer from './TilesetLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    StoresLayer(),
    TilesetLayer(),
    // [hygen] Add layer
  ];
};
