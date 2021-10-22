// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';
import { AddSource } from '@carto/react-redux';

const EXAMPLE_SOURCE_ID = 'exampleSource';

const source = {
  id: EXAMPLE_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  connection: '',
  data: '',
};

// @ts-ignore
export default source as AddSource;
