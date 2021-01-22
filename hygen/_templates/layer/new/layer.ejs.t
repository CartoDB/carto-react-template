---
to: src/components/layers/<%= h.changeCase.pascalCase(name) -%>.js
---
<% const SQLLayer = type_source === 'sql' -%>
import { useSelector } from 'react-redux';
<% if(SQLLayer){ -%>
import { <%= type_className %> } from '@deck.gl/carto';
import { buildQueryFilters } from '@carto/react/api';
<% } -%>
<% if(!SQLLayer) { -%>
import { <%= type_className %> } from '@deck.gl/carto';
<% } -%>
import { selectSourceById } from '@carto/react/redux';
import htmlForFeature from 'utils/htmlForFeature';

export const <%= h.changeCase.constantCase(name) %>_ID = '<%= h.changeCase.camelCase(name) %>';

export default function <%= h.changeCase.pascalCase(name) %>() {
  const { <%= h.changeCase.camelCase(name) %> } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, <%= h.changeCase.camelCase(name) %>?.source));

  if (<%= h.changeCase.camelCase(name) %> && source) {
    <% if(SQLLayer){ %>
    return new <%= type_className %>({
      id: <%= h.changeCase.constantCase(name) %>_ID,
      data: buildQueryFilters(source),
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature(info.object),
            style: { }
          };
        }
      }
    });
    <% } -%>
    <% if(!SQLLayer){ %>
    return new <%= type_className %>({
      id: <%= h.changeCase.constantCase(name) %>_ID,
      data: source.data,
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature(info.object),
            style: { }
          };
        }
      }
    });
    <% } %>
  }
}