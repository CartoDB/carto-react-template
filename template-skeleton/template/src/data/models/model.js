import { executeSQL } from '@carto/react/api';

export const getData = async ({ credentials, opts }) => {
  const query = `
    TYPE YOUR QUERY HERE
  `;

  return await executeSQL(credentials, query, opts).then((data) => data[0]);
};
