import KpiLayer from './KpiLayer';
import StoresLayer from './StoresLayer';
import GeocoderLayer from './GeocoderLayer';
import IsochroneLayer from './IsochroneLayer';
import TilesetLayer from './TilesetLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    IsochroneLayer(),
    StoresLayer(),
    KpiLayer(),
    GeocoderLayer(),
    TilesetLayer(),
    // [hygen] Add layer
  ];
};
