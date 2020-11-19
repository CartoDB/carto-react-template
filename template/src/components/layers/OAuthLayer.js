import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';

import { slice } from 'react-victor-test';

export default function OAuthLayer() {
  const { oauthLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) =>
    slice.selectSourceById(state, oauthLayer?.source)
  );

  const htmlForFeature = (feature) => {
    let html = '';
    Object.keys(feature.properties).forEach((propertyName) => {
      html = html.concat(
        `<strong>${propertyName}</strong>: ${feature.properties[propertyName]}<br/>`
      );
    });
    return html;
  };

  if (oauthLayer && source) {
    return new CartoSQLLayer({
      id: 'oauthLayer',
      data: source.data,
      credentials: source.credentials,

      pickable: true,
      autohighlight: true,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 2,
      getFillColor: [238, 77, 90],
      pointRadiusMinPixels: 2.5,
      getLineColor: [255, 77, 90],
      getRadius: 30,
      getLineWidth: 1,
      onHover: (info) => {
        if (info && info.object) {
          info.object = {
            html: htmlForFeature(info.object),
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
