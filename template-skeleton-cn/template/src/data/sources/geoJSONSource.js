import { MAP_TYPES, PROVIDERS } from '@deck.gl/carto';

const source = {
  id: 'geoJSONSource',
  type: MAP_TYPES.TABLE,
  provider: PROVIDERS.BIGQUERY,
  connection: 'bigquery',
  data: 'cartodb-gcp-backend-data-team.alasarr.states_pop',
};

export default source;
