const TILESET_SOURCE_ID = 'tilesetSource';

const source = {
  id: TILESET_SOURCE_ID,
  type: 'bigquery',
  // data: 'cartodb-gcp-backend-data-team.alasarr.usa_censustract_2015_tileset',
  // data: 'cartodb-gcp-backend-data-team.alasarr.usa_zcta_2015_tileset'
  data: 'cartodb-gcp-backend-data-team.alasarr.usa_blockgroup_tileset',

  // data: 'cartobq.maps.nyc_taxi_points_demo_id'
  // data: 'cartobq.maps.eurivers'
};

export default source;
