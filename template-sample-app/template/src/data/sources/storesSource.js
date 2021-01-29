const STORES_SOURCE_ID = 'storesSource';

const stores = {
  id: STORES_SOURCE_ID,
  data: `
    SELECT
      cartodb_id,
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

export default stores;
