export const STORES_SOURCE_ID = 'storesSource';

export const STORES_SOURCE_COLUMNS = {
  REVENUE: 'revenue',
  STORE_TYPE: 'storeType',
};

export default {
  id: STORES_SOURCE_ID,
  data: `
    SELECT
      store_id,
      zip,
      storetype as ${STORES_SOURCE_COLUMNS.STORE_TYPE},
      revenue as ${STORES_SOURCE_COLUMNS.REVENUE},
      state,
      the_geom_webmercator
    FROM retail_stores
  `,
  type: 'sql',
};
