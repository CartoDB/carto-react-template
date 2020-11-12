import KpiLayer from './KpiLayer';
import StoresLayer from './StoresLayer';
import OAuthLayer from './OAuthLayer';
import GeocoderLayer from './GeocoderLayer';
import IsolineLayer from './IsolineLayer';

export const getLayers = () => {
  return [IsolineLayer(), StoresLayer(), KpiLayer(), OAuthLayer(), GeocoderLayer()];
};
