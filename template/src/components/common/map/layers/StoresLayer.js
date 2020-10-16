import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartoSQLLayer } from '@deck.gl/carto';
import { selectSourceById } from 'config/cartoSlice';
import { getFilteredQuery } from '@carto/airship-api';

export function StoresLayer() {
  const navigate = useNavigate();
  const { storesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, storesLayer?.source));

  if (storesLayer && source) {
    const COLORS = {
      AIRPORT: [6, 219, 141],
      'BUS/TRAIN': [174, 14, 20],
      CASINO: [205, 123, 245],
      COLLEGE: [87, 36, 92],
      'DTHRU ONLY': [18, 162, 245],
      FREESTANDING: [177, 63, 100],
      'GAS STATION': [97, 120, 117],
      HOSPITAL: [90, 167, 134],
      INSTORE: [188, 122, 162],
      MALL: [101, 12, 56],
      MILTARY: [101, 105, 70],
      MUSEUM: [57, 116, 147],
      RECREATION: [108, 131, 211],
      'SHARED BLDNG': [72, 211, 202],
      STADIUM: [53, 70, 111],
      STOREFRONT: [65, 136, 84],
      TOLLWAY: [135, 85, 56],
      'TRAVEL CNTR': [169, 50, 174],
      'WAL*MART': [191, 221, 140],
    };

    return new CartoSQLLayer({
      id: 'storesPointLayer',
      data: getFilteredQuery(source),
      credentials: source.credentials,
      getFillColor: (object) => COLORS[object.properties.storetype],
      pointRadiusMinPixels: 3,
      pickable: true,
      onHover: (info) => {
        if (info && info.object) {
          info.object = {
            html: `
              <strong>State</strong>: ${info.object.properties.state}<br>
              <strong>Zip</strong>: ${info.object.properties.zip}<br>
              <strong>Type</strong>: ${info.object.properties.storetype}<br>
              <strong>Revenue:</strong>: ${info.object.properties.revenue}
            `,
          };
        }
      },
      onClick: (info) => {
        if (info && info.object) {
          navigate(`/stores/${info.object.properties.store_id}`);
        }
      },
    });
  }
}
