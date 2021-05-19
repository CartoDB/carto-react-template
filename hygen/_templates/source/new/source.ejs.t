---
to: src/data/sources/<%= h.changeCase.camelCase(name) -%>.js
---
<% if (platform === 'carto') { -%>
import { MAP_TYPES } from '@deck.gl/carto';
<% } -%>
<% if (platform === 'carto-cloud-native') { -%>
import { MAP_TYPES, PROVIDERS } from '@deck.gl/carto';
<% } -%>

const <%= h.changeCase.constantCase(name) %>_ID = '<%= h.changeCase.camelCase(name) %>';

const source = {
  id: <%= h.changeCase.constantCase(name) %>_ID,
  type: <%- type -%>,
<% if (platform === 'carto-cloud-native') { -%>
  provider: <%- provider -%>,
  connection: '<%- connection %>',
<% } -%>
  data: '<%- data -%>',
};

export default source;
