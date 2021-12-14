import KpiLayer from './KpiLayer';
import StoresLayer from './StoresLayer';
import GeocoderLayer from './GeocoderLayer';
import IsochroneLayer from './IsochroneLayer';
import TilesetLayer from './TilesetLayer';
import CollisionsLayer from './CollisionsLayer';
import NebulaLayer from './NebulaLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    NebulaLayer(),
    IsochroneLayer(),
    StoresLayer(),
    KpiLayer(),
    GeocoderLayer(),
    TilesetLayer(),
    CollisionsLayer(),
    // [hygen] Add layer
  ];
};
