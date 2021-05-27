import { MAP_TYPES } from '@deck.gl/carto';

const GEOJSON_SOURCE_ID = 'geojsonSource';

const source = {
  id: GEOJSON_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'bigquery',
  data: 'cartodb-gcp-backend-data-team.alasarr.states_pop',
};

export default source;
