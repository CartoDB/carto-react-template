import { executeSQL, getFilterCondition, getConditionFromViewPort } from '..';

export const getHistogram = (props) => {
  const {
    data,
    credentials,
    operation,
    'operation-column': operationColumn = '*',
    column,
    filters,
    viewport,
  } = props;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get categories');
  }

  let query =
    (viewport &&
      `SELECT * FROM (${data}) as q WHERE ${getConditionFromViewPort(viewport)}`) ||
    data;

  query = `
    SELECT ${operation}(${operationColumn}) as value, ${column} as tick
    FROM (${query}) as q
    ${getFilterCondition(filters)} group by ${column}
  `;

  return executeSQL(credentials, query);
};
