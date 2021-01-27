---
to: src/data/sources/<%= h.changeCase.camelCase(name) -%>Source.js
---
export const <%= h.changeCase.constantCase(name) %>_SOURCE_ID = '<%= h.changeCase.camelCase(name) %>Source';

export default {
  id: <%= h.changeCase.constantCase(name) %>_SOURCE_ID,
  data: `
    <%- data -%>
  `,
  type: '<%- type -%>',
};
