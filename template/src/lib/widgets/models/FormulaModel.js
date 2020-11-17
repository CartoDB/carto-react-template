import { executeSQL, filtersToSQL, viewportToSQL } from '../../api';

export const getFormula = async (props) => {
  const { data, credentials, operation, column, filters, viewport, opts } = props;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get categories');
  }

  let query =
    (viewport && `SELECT * FROM (${data})  as q WHERE ${viewportToSQL(viewport)}`) ||
    data;

  query = `
    SELECT ${operation}(${column}) as value
    FROM (${query}) as q
    ${filtersToSQL(filters)}
  `;

  return await executeSQL(credentials, query, opts);
};
