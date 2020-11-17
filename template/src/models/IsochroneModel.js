import { executeSQL } from 'lib';

export const MODES = {
  WALK: 'walk',
  CAR: 'car',
};

export const RANGES = {
  FIVE: 5,
  TEN: 10,
  FIFTEEN: 15,
  TWENTY: 20,
  THIRTY: 30,
};

export const getIsochrone = async (
  credentials,
  { geom, mode = MODES.WALK, range = RANGES.TEN }
) => {
  if (credentials.apiKey === 'default_public') {
    throw new Error('To calculate isochrones you need to login or provide an API KEY');
  }

  const query = `SELECT q.the_geom from cdb_isochrone(ST_SetSRID(ST_MakePoint(${
    geom[1]
  }, ${geom[0]}),4326), '${mode}', ARRAY[${range * 60}]) q`;
  return await executeSQL(credentials, query, { format: 'geojson' });
};
