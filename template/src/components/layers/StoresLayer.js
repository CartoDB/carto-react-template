import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartoSQLLayer } from '@deck.gl/carto';
import { buildQuery } from 'lib/sdk';
import { selectSourceById } from 'config/cartoSlice';
import { currencyFormatter } from 'utils/formatter';

export const LayerStyle = {
  id: 'storesLayer',
  title: 'Store types',
  geomType: 'point',
  colors: {
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
  },
  labels: {
    AIRPORT: 'Airport',
    'BUS/TRAIN': 'Bus/Train',
    CASINO: 'Casino',
    COLLEGE: 'College',
    'DTHRU ONLY': 'Drivethru only',
    FREESTANDING: 'Freestanding',
    'GAS STATION': 'Gas Station',
    HOSPITAL: 'Hospital',
    INSTORE: 'InStore',
    MALL: 'Mall',
    MILTARY: 'Military',
    MUSEUM: 'Museum',
    RECREATION: 'Recreation',
    'SHARED BLDNG': 'Shared Building',
    STADIUM: 'Stadium',
    STOREFRONT: 'Storefront',
    TOLLWAY: 'Tollway',
    'TRAVEL CNTR': 'Travel Center',
    'WAL*MART': 'Wallmart',
  },
};

export default function StoresLayer() {
  const navigate = useNavigate();
  const { storesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, storesLayer?.source));

  if (storesLayer && source) {
    return new CartoSQLLayer({
      id: 'storesPointLayer',
      data: buildQuery(source),
      credentials: source.credentials,
      getFillColor: (store) => LayerStyle.colors[store.properties.storetype],
      pointRadiusMinPixels: 3,
      getRadius: (info) =>
        info.properties.store_id === storesLayer.selectedStore ? 300 : 100,
      pickable: true,
      onHover: (info) => {
        if (info && info.object) {
          const formattedRevenue = currencyFormatter(info.object.properties.revenue);
          info.object = {
            html: `
              <strong>Store ${info.object.properties.store_id}</strong><br>
              ${formattedRevenue.preffix}${formattedRevenue.value}
            `,
          };
        }
      },
      onClick: (info) => {
        if (info && info.object) {
          navigate(`/stores/${info.object.properties.store_id}`);
        }
      },
      updateTriggers: {
        getRadius: { selectedStore: storesLayer.selectedStore },
      },
    });
  }
}
