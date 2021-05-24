import { MAP_TYPES } from '@deck.gl/carto';

const source = {
  id: 'tilesetSource',
  type: MAP_TYPES.TILESET,
  connection: 'bigquery',
  data: 'cartobq.maps.osm_buildings',
};

export default source;
