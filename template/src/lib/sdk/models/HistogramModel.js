import { executeSQL, getFilterCondition, getConditionFromViewPort } from '..';

export const getHistogram = async (props) => {
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

    return await executeSQL(credentials, query);
  } else {
    const caseTicks = ticks.map(
      (t, index) => `WHEN ${column} < ${t} THEN 'cat_${index}'`
    );
    caseTicks.push(`ELSE 'cat_${ticks.length}'`);

    query = `
      SELECT tick, ${operation}(${operationColumn}) as value
        FROM (
          SELECT CASE ${caseTicks.join(
            ' '
          )} END as tick, ${operationColumn} FROM (${query}) as q1
        ) as q
      ${getFilterCondition(filters)}
      GROUP BY tick`;

    const data = await executeSQL(credentials, query);
    const result = [];
    for (let i = 0; i <= ticks.length; i++) {
      const tick = `cat_${i}`;
      const element = data.find((d) => d.tick === tick);
      result.push({
        tick,
        value: element ? element.value : null,
      });
    }
    return result;
  }
};
