---
to: src/data/models/<%= h.changeCase.camelCase(name) -%>.js
---

export const get<%= h.changeCase.pascalCase(name) %>Data = ({ credentials, opts = {} }) => {
  const query = `
    TYPE YOUR QUERY HERE
  `;

  return executeSQL(credentials, query, opts).then((data) => data[0]);
};
