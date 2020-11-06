import { executeSQL, getFilterCondition, getConditionFromViewPort } from '..';

export const getHistogram = (props) => {
  const { data, credentials, column, operation, ticks, filters, viewport } = props;

  const operationColumn = props['operation-column'] || column;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get histogram');
  }

  let query =
    (viewport &&
      `SELECT * FROM (${data})  as q WHERE ${getConditionFromViewPort(viewport)}`) ||
    data;

  if (!ticks) {
    query = `WITH all_ticks as (
      SELECT ${column} as tick
        FROM (${query}) as q
      GROUP BY tick
    ),
    ticks as (
      SELECT ${column} as tick, ${operation}(${operationColumn}) as value
        FROM (${query}) as q
      ${getFilterCondition(filters)}
      GROUP BY tick
    )
    SELECT a.tick, b.value
      FROM all_ticks a
      LEFT JOIN ticks b ON a.tick=b.tick
      ORDER BY value DESC NULLS LAST`;
  } else {
  }

  return executeSQL(credentials, query);
};
