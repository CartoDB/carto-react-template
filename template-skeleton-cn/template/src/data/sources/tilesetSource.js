import { MAP_TYPES, PROVIDERS } from '@deck.gl/carto';

const source = {
  id: 'tilesetSource',
  type: MAP_TYPES.TILESET,
  provider: PROVIDERS.BIGQUERY,
  connection: 'bigquery',
  data: 'cartobq.maps.osm_buildings',
};

export default source;
