import { executeSQL } from '@carto/react-api';

export async function getData({ credentials, opts }) {
  const query = `
    TYPE YOUR QUERY HERE
  `;

  const data = await executeSQL({ credentials, query, opts });
  return data[0];
}
