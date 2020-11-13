import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { buildQuery } from 'lib/sdk';
import { selectSourceById } from 'config/cartoSlice';

export default function PLayer() {
  const { pLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, pLayer?.source));

  if (pLayer && source) {
    return new CartoSQLLayer({
      id: 'pLayer',
      data: buildQuery(source),
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
    });
  }
}
