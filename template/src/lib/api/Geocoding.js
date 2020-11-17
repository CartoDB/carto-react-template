// Geocoding / Data Services https://carto.com/developers/data-services-api/reference/

import { executeSQL } from './SQL';

/**
 * Street-Level Geocoder
 * @param {*} credentials
 * @param {*} { searchText, city, state, country } all optional but searchText
 *
 *
 */
export const geocodeStreetPoint = async (
  credentials,
  { searchText, city, state, country },
  opts = {}
) => {
  if (credentials.apiKey === 'default_public') {
    throw new Error('To search a location you need to login or provide an API KEY');
  }

  const query = `SELECT ST_AsGeoJSON(cdb_geocode_street_point('${searchText}', '${
    city ?? ''
  }', '${state ?? ''}', '${country ?? ''}')) AS geometry`;
  const results = await executeSQL(credentials, query, opts);

  const geometry = JSON.parse(results[0].geometry);
  if (geometry === null) return null;

  // Just 1 result is returned, with geometry value on success
  const [longitude, latitude] = geometry.coordinates;
  return {
    longitude,
    latitude,
  };
};

// OTHER GEOCODING OPTIONS:
//      Country Geocoder: cdb_geocode_admin0polygon(_country_name text)
//      Level-1 Administrative Regions Geocoder: cdb_geocode_admin1polygon(_admin1_name text)
//      City Geocoder: cdb_geocode_namedplace_point(city_name text)
//      Postal Code Geocoder: cdb_geocode_postalcode_point(code text, country_name text)
//      IP Addresses Geocoder: cdb_geocode_ipaddress_point(ip_address text)
