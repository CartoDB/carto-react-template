import { execute } from '@carto/airship-api';

export const getStore = ({ id, credentials }) => {
  const query = `
    SELECT address, city, phone, revenue, storetype, zip, ST_X(the_geom) as longitude, ST_Y(the_geom) as latitude
      FROM mcdonalds 
      WHERE store_id='${id}'
  `;

  return execute(query, credentials).then((data) => data[0]);
};

export const getRevenuePerMonth = ({ id, credentials }) => {
  const query = `
      SELECT revenue, date, 
          (
            SELECT AVG(revenue) 
            FROM mcdonalds_revenue sub
            WHERE sub.date =  date
          ) as avg
        FROM mcdonalds_revenue
        WHERE store_id='${id}'
  `;
  return execute(query, credentials);
};

// Get the N nearest stores in a mercator radius
export const getNearest = ({ id, maxDistance, limit, credentials }) => {
  const query = `
    WITH current_store as (
      SELECT the_geom_webmercator, store_id FROM mcdonalds WHERE store_id='${id}'
    )
    SELECT a.store_id, ST_Distance(a.the_geom_webmercator, b.the_geom_webmercator) as distance, 
        address, city, revenue
      FROM mcdonalds a , current_store b
      WHERE a.store_id != b.store_id
        AND ST_DWithin(b.the_geom_webmercator, a.the_geom_webmercator, ${maxDistance})
      ORDER BY distance
      LIMIT ${limit}
  `;
  return execute(query, credentials);
};
