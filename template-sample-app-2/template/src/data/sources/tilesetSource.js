import { MAP_TYPES } from '@deck.gl/carto';

const TILESET_SOURCE_ID = 'tilesetSource';

const source = {
  id: TILESET_SOURCE_ID,
  type: MAP_TYPES.TILESET,
  data: 'cartobq.maps.osm_buildings',
};

export default source;
