import { MAP_TYPES } from '@deck.gl/carto';

const source = {
  id: 'geoJSONSource',
  type: MAP_TYPES.TABLE,
  connection: 'bigquery',
  data: 'cartodb-gcp-backend-data-team.alasarr.states_pop',
};

export default source;
