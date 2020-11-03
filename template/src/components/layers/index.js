import KpiLayer from './KpiLayer';
import StoresLayer from './StoresLayer';
import OAuthLayer from './OAuthLayer';

export const getLayers = () => {
  return [StoresLayer(), KpiLayer(), OAuthLayer()];
};
