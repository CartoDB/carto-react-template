import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { selectSourceById } from 'config/cartoSlice';
import { getFilteredQuery } from '@carto/airship-api';

const COLOR_SCALE = {
  50000000: [215, 48, 39],
  1000000000: [255, 197, 116],
  1500000000: [26, 152, 80],
};

function getFillColor(f) {
  let keys = Object.keys(COLOR_SCALE);
  let color = COLOR_SCALE[keys[keys.length - 1]];
  for (let i = keys.length - 1; i >= 0; i--) {
    if (parseInt(f.properties.revenue) <= parseInt(keys[i])) {
      color = COLOR_SCALE[keys[i]];
    } else {
      return color;
    }
  }
  return color;
}

export function RevenueByStateLayer() {
  const { revenueByStateLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, revenueByStateLayer?.source)
  );

  if (revenueByStateLayer && source) {
    return new CartoSQLLayer({
      id: 'revenueByStatesLayer',
      data: getFilteredQuery(source),
      credentials: source.credentials,
      getFillColor: getFillColor,
      getLineColor: [255, 255, 255],
      getLineWidth: 1,
      lineWidthMinPixels: 1,
      pickable: true,
      onHover: (info) => {
        if (info && info.object) {
          info.object = {
            html: `
              <strong>State</strong>: ${info.object.properties.name}<br>
              <strong>Revenue:</strong>: ${info.object.properties.revenue}
            `,
          };
        }
      },
    });
  }
}
