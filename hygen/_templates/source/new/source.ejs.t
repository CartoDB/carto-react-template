---
to: src/data/sources/<%= h.changeCase.pascalCase(name) -%>.js
---
export const <%= h.changeCase.constantCase(name) %>_ID = '<%= h.changeCase.camelCase(name) %>';

export const <%= h.changeCase.camelCase(name) %> = {
  id: <%= h.changeCase.constantCase(name) %>_ID,
  data: `
    <%- data -%>
  `,
  type: '<%- type -%>',
};
