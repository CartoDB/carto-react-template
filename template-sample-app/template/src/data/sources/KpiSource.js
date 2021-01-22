export const KPI_SOURCE_ID = 'kpiSource'

export const KPI_SOURCE_COLUMNS = {
  NAME: 'name',
  REVENUE: 'revenue'
}

export const kpiSource = {
  id: KPI_SOURCE_ID,
  data: `
  SELECT
    states.name as ${KPI_SOURCE_COLUMNS.NAME},
    SUM(stores.revenue) as ${KPI_SOURCE_COLUMNS.REVENUE},
    states.the_geom_webmercator
  FROM ne_50m_admin_1_states as states
  JOIN retail_stores as stores ON ST_Intersects(states.the_geom_webmercator, stores.the_geom_webmercator)
  GROUP BY states.name, states.the_geom_webmercator
  `
}
