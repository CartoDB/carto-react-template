import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';

export function Example() {
  const { example } = useSelector((state) => state.map.layers);
  const dataSources = useSelector((state) => state.map.dataSources);

  if (example) {
    const source = dataSources[example.source];
    if (source) {
      return new CartoSQLLayer({
        id: 'exampleLayer',
        data: source.data,
      });
    }
  }
}
