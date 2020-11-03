import KpiLayer from './KpiLayer';
import StoresLayer from './StoresLayer';

export const getLayers = () => {
  return [StoresLayer(), KpiLayer()];
};
