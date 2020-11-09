import { executeSQL, getFilterCondition, getConditionFromViewPort } from '..';

export const getCategories = async (props) => {
  const { data, credentials, column, operation, filters, viewport } = props;

  const operationColumn = props['operation-column'] || column;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get categories');
  }

  let query =
    (viewport &&
      `SELECT * FROM (${data})  as q WHERE ${getConditionFromViewPort(viewport)}`) ||
    data;

  query = `WITH all_categories as (
    SELECT ${column} as category
      FROM (${query}) as q
    GROUP BY category
  ),
  categories as (
    SELECT ${column} as category, ${operation}(${operationColumn}) as value
      FROM (${query}) as q
    ${getFilterCondition(filters)}
    GROUP BY category
  )
  SELECT a.category, b.value
    FROM all_categories a
    LEFT JOIN categories b ON a.category=b.category
    ORDER BY value DESC NULLS LAST;`;

  return await executeSQL(credentials, query);
};
