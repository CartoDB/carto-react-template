import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { buildQuery } from 'lib/sdk';
import { selectSourceById } from 'config/cartoSlice';

export default function ExampleLayer() {
  const { exampleLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, exampleLayer?.source));

  if (exampleLayer && source) {
    return new CartoSQLLayer({
      id: 'exampleLayer',
      data: buildQuery(source),
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
    });
  }
}
