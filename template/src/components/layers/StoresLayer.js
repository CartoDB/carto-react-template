import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartoSQLLayer } from '@deck.gl/carto';
import { buildQueryFilters } from 'lib/api';
import { currencyFormatter } from 'utils/formatter';
import { selectSourceById } from 'lib/slice/cartoSlice';

export const LayerStyle = {
  id: 'storesLayer',
  title: 'Store types',
  geomType: 'point',
  colors: {
    FREESTANDING: [127, 60, 141],
    'WAL*MART': [17, 165, 121],
    'GAS STATION': [57, 105, 172],
    STOREFRONT: [242, 183, 1],
    MALL: [231, 63, 116],
    OTHERS: [128, 186, 90],
  },
};

export default function StoresLayer() {
  const navigate = useNavigate();
  const { storesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, storesLayer?.source));

  if (storesLayer && source) {
    return new CartoSQLLayer({
      id: 'storesPointLayer',
      data: buildQueryFilters(source),
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
