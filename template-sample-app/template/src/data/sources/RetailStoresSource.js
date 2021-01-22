export const RETAIL_STORES_SOURCE_ID = 'retailStoresSource';

export const retailStoresSource = {
  id: RETAIL_STORES_SOURCE_ID,
  data: `
    SELECT store_id, zip, storetype, state, revenue, the_geom_webmercator FROM retail_stores
  `,
  type: 'sql',
};
