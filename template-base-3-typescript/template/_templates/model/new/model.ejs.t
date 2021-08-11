---
to: src/data/models/<%= h.changeCase.camelCase(name) -%>.js
---
import { executeSQL } from '@carto/react-api';

export async function get<%= h.changeCase.pascalCase(name) %>Data({ credentials, opts = {} }) {
  const query = `TYPE YOUR QUERY HERE`;

  const data = await executeSQL({ credentials, query, opts });
  return data[0];
}
