---
to: src/features/map/layers/<%= h.changeCase.pascalCase(name) %>Layer.js
---
<% const compPascal = h.changeCase.pascalCase(name) -%>
<% const compCamel = h.changeCase.camelCase(name) -%>
import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';

export function <%= compPascal %> () {
  const { <%= compCamel %> } = useSelector(state => state.map.layers)
  const dataSources = useSelector(state => state.map.dataSources)

  if (<%= compCamel %>) {
    const source = dataSources[<%= compCamel %>.source]
    if (source) {
      return new CartoSQLLayer ({
        id: '<%= compCamel %>Layer',
        data: source.data
      })
    }
  }
}
