import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export function useLayer(layerId: string) {
  const layers = useSelector((state: RootState) => state.carto.layers);

  return layers[layerId];
}
