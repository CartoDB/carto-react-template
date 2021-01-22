---
to: src/data/sources/<%= h.changeCase.pascalCase(name) -%>Source.js
---
export const <%= h.changeCase.constantCase(name) %>_SOURCE_ID = '<%= h.changeCase.camelCase(name) %>Source';

export const <%= h.changeCase.camelCase(name) %>Source = {
  id: <%= h.changeCase.constantCase(name) %>_SOURCE_ID,
  data: `
    <%- data -%>
  `,
  type: '<%- type -%>',
};
