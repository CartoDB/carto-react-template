import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { getFilteredQuery } from 'lib/models/FitlerConditionBuilder'

export function CountryLayer () {
  const {countriesLayer} = useSelector(state => state.map.layers)
  const dataSources = useSelector(state => state.map.dataSources)

  if (countriesLayer) {
    const source = dataSources[countriesLayer.source]
    if (source) {
      return new CartoSQLLayer ({
        id: 'countriesPolygonLayer',
        data: getFilteredQuery(source),
        getFillColor: [130, 109, 186],
        stroked: true,
        lineWidthMinPixels: 1,
        pickable: true
      })
    }
  }
}
