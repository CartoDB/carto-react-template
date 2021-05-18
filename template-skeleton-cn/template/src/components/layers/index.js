import TilesetLayer from './TilesetLayer';
import GeoJSONLayer from './GeoJSONLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    TilesetLayer(),
    GeoJSONLayer(),
    // [hygen] Add layer
  ];
};
