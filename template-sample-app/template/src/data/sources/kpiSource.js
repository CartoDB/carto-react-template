const KPI_SOURCE_ID = 'kpiSource';

export default {
  id: KPI_SOURCE_ID,
  data: `
  SELECT
    states.cartodb_id,
    states.name,
    SUM(stores.revenue) as revenue,
    states.the_geom_webmercator
  FROM ne_50m_admin_1_states as states
  JOIN retail_stores as stores ON ST_Intersects(states.the_geom_webmercator, stores.the_geom_webmercator)
  GROUP BY states.cartodb_id, states.name, states.the_geom_webmercator
  `,
};
