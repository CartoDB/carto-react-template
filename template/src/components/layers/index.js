import KpiLayer from './KpiLayer';
import StoresLayer from './StoresLayer';
import OAuthLayer from './OAuthLayer';
import GeocoderLayer from './GeocoderLayer';
import IsochroneLayer from './IsochroneLayer';

export const getLayers = () => {
  return [StoresLayer(), KpiLayer(), OAuthLayer(), GeocoderLayer(), IsochroneLayer()];
};
