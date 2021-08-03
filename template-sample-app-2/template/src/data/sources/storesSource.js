import { MAP_TYPES } from '@deck.gl/carto';

const STORES_SOURCE_ID = 'storesSource';

const source = {
  id: STORES_SOURCE_ID,
  data: `
    SELECT
      cartodb_id,
      store_id,
      zip,
      storetype,
      revenue,
      size_m2,
      state,
      the_geom_webmercator
    FROM retail_stores
  `,
  type: MAP_TYPES.QUERY,
};

export default source;
