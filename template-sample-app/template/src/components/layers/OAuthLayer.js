import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import htmlForFeature from 'utils/htmlForFeature';

export default function OAuthLayer() {
  const { oauthLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, oauthLayer?.source));

  if (oauthLayer && source) {
    return new CartoSQLLayer({
      id: 'oauthLayer',
      data: source.data,
      credentials: source.credentials,

      pickable: true,
      autohighlight: true,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 1,
      getFillColor: [238, 77, 90],
      pointRadiusMinPixels: 5,
      getLineColor: [238, 238, 238],
      getRadius: 30,
      getLineWidth: 1,
      onHover: (info) => {
        if (info && info.object) {
          info.object = {
            html: htmlForFeature(info.object),
          };
        }
      },
    });
  }
}
