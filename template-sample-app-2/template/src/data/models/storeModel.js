import { executeSQL } from '@carto/react-api';

export const getStore = async ({ id, credentials, opts }) => {
  const query = `
    SELECT address, city, revenue, storetype, zip, ST_X(the_geom) as longitude, ST_Y(the_geom) as latitude
      FROM retail_stores
      WHERE store_id='${id}'
  `;

  return executeSQL({ credentials, query, opts }).then((data) => data[0]);
};

const BINS = 4;

export const getRevenuePerMonth = async ({ id, credentials, opts }) => {
  const query = `SELECT
    tick,
    count(revenue) as value,
    MIN(q._min) _min,
    MAX(q._max) _max
  FROM (
    SELECT
    CASE WHEN revenue < (minMax._min + (minMax._max - minMax._min) * ${1 / 4}) THEN 0
         WHEN revenue < (minMax._min + (minMax._max - minMax._min) * ${2 / 4}) THEN 1
         WHEN revenue < (minMax._min + (minMax._max - minMax._min) * ${3 / 4}) THEN 2
         ELSE 3
      END as tick,
      revenue,
      minMax.*
    FROM retail_stores_revenue,
    (SELECT MIN(revenue) _min, MAX(revenue) _max FROM retail_stores_revenue WHERE store_id='${id}') minMax
    WHERE store_id='${id}'
  ) q
  GROUP BY tick`;

  const data = await executeSQL({ credentials, query, opts });

  const result = Array(BINS).fill(0);
  data.forEach(({ tick, value }) => (result[tick] = value));

  const min = data[0]._min;
  const max = data[0]._max;

  return {
    min,
    max,
    data: result,
    ticks: Array(BINS - 1)
      .fill(0)
      .map((_, index) => min + (max - min) * ((index + 1) / BINS)),
  };
};
