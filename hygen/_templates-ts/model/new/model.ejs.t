---
to: src/data/models/<%= h.changeCase.camelCase(name) -%>.ts
---
import { Credentials, executeSQL } from '@carto/react-api';

export async function get<%= h.changeCase.pascalCase(name) %>Data({
  credentials,
  opts = {},
}: {
  credentials: Credentials;
  opts: any;
}) {
  const query = `TYPE YOUR QUERY HERE`;

  const data = await executeSQL({ credentials, query, opts });
  return data;
}
