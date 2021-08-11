import { Viewport } from '@carto/react-core';

// TODO: import from '@carto/react' when ready
export function viewportToSQL(viewport: Viewport, geomKey = 'the_geom_webmercator') {
  return `ST_Intersects(
    ${geomKey},
    ST_Transform(ST_MakeEnvelope(${viewport.join(',')}, 4326), 3857)
  )`;
}
