import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartoSQLLayer } from '@deck.gl/carto';

import { buildQueryFilters } from '@carto/react/api';
import { selectSourceById } from '@carto/react/redux';

import { currencyFormatter } from 'utils/formatter';

export const STORES_LAYER_ID = 'storesLayer';

export const LayerStyle = {
  id: STORES_LAYER_ID,
  title: 'Store types',
  geomType: 'point',
  colors: {
    Supermarket: [80, 20, 85],
    'Discount Store': [128, 186, 90],
    Hypermarket: [231, 63, 116],
    Drugstore: [242, 183, 1],
    'Department Store': [57, 105, 172],
    Others: [17, 165, 121],
  },
};

export default function StoresLayer() {
  const navigate = useNavigate();
  const { storesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, storesLayer?.source));

  if (storesLayer && source) {
    return new CartoSQLLayer({
      id: STORES_LAYER_ID,
      data: buildQueryFilters(source),
      credentials: source.credentials,
      getFillColor: (store) =>
        LayerStyle.colors[store.properties.storetype] || LayerStyle.colors['Others'],
      pointRadiusMinPixels: 3,
      getRadius: (info) =>
        info.properties.store_id === storesLayer.selectedStore ? 300 : 100,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          const formattedRevenue = currencyFormatter(info.object.properties.revenue);
          info.object = {
            html: `
              <strong>Store ${info.object.properties.store_id}</strong><br>
              ${formattedRevenue.prefix}${formattedRevenue.value}
            `,
          };
        }
      },
      onClick: (info) => {
        if (info?.object) {
          navigate(`/stores/${info.object.properties.store_id}`);
        }
      },
      updateTriggers: {
        getRadius: { selectedStore: storesLayer.selectedStore },
      },
    });
  }
}
