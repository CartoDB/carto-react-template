---
to: src/components/layers/<%= h.changeCase.pascalCase(name) -%>.js
---
<% const SQLLayer = type === 'CartoSQLLayer' -%>
import { useSelector } from 'react-redux';
<% if(SQLLayer){ -%>
import { CartoSQLLayer } from '@deck.gl/carto';
import { buildQuery } from 'lib';
<% } -%>
<% if(!SQLLayer) { -%>
import { CartoBQTilerLayer } from '@deck.gl/carto';
<% } -%>
import { selectSourceById } from 'lib/sdk/slice/cartoSlice';

export default function <%= h.changeCase.pascalCase(name) %>() {
  const { <%= h.changeCase.camelCase(name) %> } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, <%= h.changeCase.camelCase(name) %>?.source));

  if (<%= h.changeCase.camelCase(name) %> && source) {
    <% if(SQLLayer){ %>
    return new CartoSQLLayer({
      id: '<%= h.changeCase.camelCase(name) %>',
      data: buildQuery(source),
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
    });
    <% } -%>
    <% if(!SQLLayer){ %>
    return new CartoBQTilerLayer({
      id: '<%= h.changeCase.camelCase(name) %>',
      data: source.data,
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
    });
    <% } %>
  }
}