---
to: src/components/layers/<%= h.changeCase.pascalCase(name) -%>Layer.js
---
<% const SQLLayer = type === 'CartoSQLLayer' -%>
import { useSelector } from 'react-redux';
<% if(SQLLayer){ -%>
import { CartoSQLLayer } from '@deck.gl/carto';
import { buildQuery } from 'lib/sdk';
<% } -%>
<% if(!SQLLayer) { -%>
import { CartoBQTilerLayer } from '@deck.gl/carto';
<% } -%>
import { selectSourceById } from 'config/cartoSlice';

export default function <%= h.changeCase.pascalCase(name) %>Layer() {
  const { <%= h.changeCase.camelCase(name) %>Layer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, <%= h.changeCase.camelCase(name) %>Layer?.source));

  if (<%= h.changeCase.camelCase(name) %>Layer && source) {
    <% if(SQLLayer){ %>
    return new CartoSQLLayer({
      id: '<%= h.changeCase.camelCase(name) %>Layer',
      data: buildQuery(source),
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
    });
    <% } -%>
    <% if(!SQLLayer){ %>
    return new CartoBQTilerLayer({
      id: '<%= h.changeCase.camelCase(name) %>Layer',
      data: source.data,
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
    });
    <% } %>
  }
}