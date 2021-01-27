---
to: src/components/layers/<%= h.changeCase.pascalCase(name) -%>Layer.js
---
<% const SQLLayer = type_source === 'sql' -%>
import { useSelector } from 'react-redux';
<% if(SQLLayer){ -%>
import { <%= type_className %> } from '@deck.gl/carto';
<% } -%>
<% if(!SQLLayer) { -%>
import { <%= type_className %> } from '@deck.gl/carto';
<% } -%>
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import htmlForFeature from 'utils/htmlForFeature';

export default function <%= h.changeCase.pascalCase(name) %>() {
  const { <%= h.changeCase.camelCase(name) %> } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, <%= h.changeCase.camelCase(name) %>?.source));
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (<%= h.changeCase.camelCase(name) %> && source) {
    <% if(SQLLayer){ %>
    return new <%= type_className %>({
      ...cartoFilterProps,
      id: '<%= h.changeCase.camelCase(name) %>Layer',
      data: source.data,
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      pickable: true,
      onHover: (info) => {
        if (info && info.object) {
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
      ...cartoFilterProps,
      id: '<%= h.changeCase.camelCase(name) %>',
      data: source.data,
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      pickable: true,
      onHover: (info) => {
        if (info && info.object) {
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