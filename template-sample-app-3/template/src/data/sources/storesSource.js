import { MAP_TYPES } from '@deck.gl/carto';

const STORES_SOURCE_ID = 'storesSource';

const source = {
  id: STORES_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'bqconn',
  data: 'carto-demo-data.demo_tables.retail_stores',
};

export default source;
