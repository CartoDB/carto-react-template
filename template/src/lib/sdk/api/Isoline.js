import { executeSQL } from "./SQL"

export const MODES = {
  WALK: 'walk',
  CAR: 'car'
}

export const launchIsochrone = async ({ geom, mode = 'walk', range = 5 }, credentials) => {
  const query = `SELECT q.the_geom from cdb_isochrone(ST_SetSRID(ST_MakePoint(${geom[1]}, ${geom[0]}),4326), '${mode}', ARRAY[${range * 60}]) q`
  return await executeSQL(credentials, query, { format: 'geojson' })
}