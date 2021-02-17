---
to: src/data/sources/<%= h.changeCase.camelCase(name) -%>.js
---
const <%= h.changeCase.constantCase(name) %>_ID = '<%= h.changeCase.camelCase(name) %>';

const source = {
  id: <%= h.changeCase.constantCase(name) %>_ID,
  data: '<%- data -%>',
  type: '<%- type -%>',
};

export default source;
