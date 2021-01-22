export const STORES_SOURCE_ID = 'storesSource';

export const storesSource = {
  id: STORES_SOURCE_ID,
  data: `
    SELECT store_id, zip, storetype, state, revenue, the_geom_webmercator FROM retail_stores
  `,
  type: 'sql',
};
