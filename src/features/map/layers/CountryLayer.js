import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { selectSourceById } from 'app/cartoSlice';
import { getFilteredQuery } from 'lib/models/FitlerConditionBuilder';

export function CountryLayer() {
  const { countriesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, countriesLayer?.source));

  if (countriesLayer && source) {
    return new CartoSQLLayer({
      id: 'countriesPolygonLayer',
      data: getFilteredQuery(source),
      getFillColor: [130, 109, 186],
      stroked: true,
      lineWidthMinPixels: 1,
      pickable: true,
      onHover: (info) => {
        if (info && info.object) {
          info.object = {
            html: `<strong>Admin name</strong>: ${info.object.properties.admin}`,
            style: {
              backgroundColor: '#fff',
              fontFamily: 'Open Sans',
              fontSize: '14px',
              color: '#000',
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              borderRadius: '4px',
              top: '-18px',
              left: '20px',
              padding: '12px',
            },
          };
        }
      },
    });
  }
}
