const STORES_SOURCE_ID = 'storesSource';

export default {
  id: STORES_SOURCE_ID,
  data: `
    SELECT
      store_id,
      zip,
      storetype,
      revenue,
      state,
      the_geom_webmercator
    FROM retail_stores
  `,
  type: 'sql',
};
