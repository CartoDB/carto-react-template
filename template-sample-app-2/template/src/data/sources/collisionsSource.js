import { MAP_TYPES } from '@deck.gl/carto';

const COLLISIONS_SOURCE_ID = 'collisionsSource';

const source = {
  id: COLLISIONS_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  data: `
    SELECT
      cartodb_id,
      the_geom_webmercator,
      vehcount,
      round(extract(epoch from incdate)) * 1000 as date
    FROM seattle_collisions`,
};

export default source;
