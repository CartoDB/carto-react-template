import { executeSQL, getFilterCondition, getConditionFromViewPort } from '..';

export const getValue = async (props) => {
  const { data, credentials, operation, column, filters, viewport } = props;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get categories');
  }

  let query =
    (viewport &&
      `SELECT * FROM (${data})  as q WHERE ${getConditionFromViewPort(viewport)}`) ||
    data;

  query = `
    SELECT ${operation}(${column}) as value
    FROM (${query}) as q
    ${getFilterCondition(filters)}
  `;

  return await executeSQL(credentials, query);
};
