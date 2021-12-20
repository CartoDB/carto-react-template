import StoresLayer from './StoresLayer';
import TilesetLayer from './TilesetLayer';
import NebulaLayer from './NebulaLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    // NebulaLayer(),
    StoresLayer(),
    TilesetLayer(),
    // [hygen] Add layer
  ];
};
