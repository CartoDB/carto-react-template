import { execute } from 'lib/api/SQL';
import { getFilterCondition } from 'lib/models/FilterConditionBuilder';

export const getStoreDetails = ({ id, source }) => {
  const { credentials } = source;
  const query = `
    SELECT address, city, phone, revenue, storetype, zip, ST_X(the_geom) as longitude, ST_Y(the_geom) as latitude
    FROM mcdonalds WHERE store_id='${id}'
  `;

  return execute(query, credentials).then((data) => data[0]);
};

export const getRevenuePerMonth = ({ id, source }) => {
  const { credentials, filters } = source;
  const query = `
    WITH avg_stores as (
      SELECT AVG(revenue) as revenue, date 
      FROM mcdonalds_revenue
      GROUP BY date 
    ),
    selected_store as (
      SELECT revenue, date FROM 
      mcdonalds_revenue 
      WHERE store_id='${id}'
    )
    SELECT a.date, a.revenue, b.revenue as revenue_all
    FROM selected_store a
    LEFT JOIN avg_stores b on a.date = b.date
    ORDER BY a.date
  `;

  return execute(query, credentials);
};
