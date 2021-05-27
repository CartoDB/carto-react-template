import TilesetLayer from './TilesetLayer';
import GeojsonLayer from './GeojsonLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    TilesetLayer(),
    GeojsonLayer(),
    // [hygen] Add layer
  ];
};
