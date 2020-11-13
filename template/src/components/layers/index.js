import KpiLayer from './KpiLayer';
import StoresLayer from './StoresLayer';
import OAuthLayer from './OAuthLayer';
import GeocoderLayer from './GeocoderLayer';
import IsochroneLayer from './IsochroneLayer';
import PLayer from './PLayer';
// Auto import

export const getLayers = () => {
  return [
    IsochroneLayer(),
    StoresLayer(),
    KpiLayer(),
    OAuthLayer(),
    GeocoderLayer(),
    // Auto import layers
  ];
};
