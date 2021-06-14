---
to: src/data/sources/<%= h.changeCase.camelCase(name) -%>.js
---
import { MAP_TYPES } from '@deck.gl/carto';

const <%= h.changeCase.constantCase(name) %>_ID = '<%= h.changeCase.camelCase(name) %>';

const source = {
  id: <%= h.changeCase.constantCase(name) %>_ID,
  type: <%- type -%>,
<% if (platform === 'carto-cloud-native') { -%>
  connection: '<%- connection %>',
<% } -%>
  data: '<%- data -%>',
};

export default source;
