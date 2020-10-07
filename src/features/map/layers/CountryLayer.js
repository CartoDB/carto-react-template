import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { selectSourceById } from 'app/cartoSlice'
import { getFilteredQuery } from 'lib/models/FitlerConditionBuilder'

export function CountryLayer () {
  const {countriesLayer} = useSelector(state => state.carto.layers)
  const source = useSelector(state => selectSourceById(state, countriesLayer?.source))

  if (countriesLayer && source) {
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
