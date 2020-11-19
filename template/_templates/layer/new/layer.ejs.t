---
to: src/components/layers/<%= h.changeCase.pascalCase(name) -%>.js
---
<% const SQLLayer = type_source === 'sql' -%>
import { useSelector } from 'react-redux';
<% if(SQLLayer){ -%>
import { <%= type_className %> } from '@deck.gl/carto';
import { api } from 'react-victor-test';
<% } -%>
<% if(!SQLLayer) { -%>
import { <%= type_className %> } from '@deck.gl/carto';
<% } -%>
import { slice } from 'react-victor-test';

export default function <%= h.changeCase.pascalCase(name) %>() {
  const { <%= h.changeCase.camelCase(name) %> } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => slice.selectSourceById(state, <%= h.changeCase.camelCase(name) %>?.source));

  if (<%= h.changeCase.camelCase(name) %> && source) {
    <% if(SQLLayer){ %>
    return new <%= type_className %>({
      id: '<%= h.changeCase.camelCase(name) %>',
      data: api.buildQuery(source),
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
    });
    <% } -%>
    <% if(!SQLLayer){ %>
    return new <%= type_className %>({
      id: '<%= h.changeCase.camelCase(name) %>',
      data: source.data,
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
    });
    <% } %>
  }
}