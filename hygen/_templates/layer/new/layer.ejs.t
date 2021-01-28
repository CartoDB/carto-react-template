---
to: src/components/layers/<%= h.changeCase.pascalCase(name) -%>.js
---
import { useSelector } from 'react-redux';
import { <%= type_className %> } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import htmlForFeature from 'utils/htmlForFeature';

export const <%= h.changeCase.constantCase(name) %>_ID = '<%= h.changeCase.camelCase(name) %>';

export default function <%= h.changeCase.pascalCase(name) %>() {
  const { <%= h.changeCase.camelCase(name) %> } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, <%= h.changeCase.camelCase(name) %>?.source));
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (<%= h.changeCase.camelCase(name) %> && source) {
    return new <%= type_className %>({
      ...cartoFilterProps,
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
  }
}
