import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartoSQLLayer } from '@deck.gl/carto';
import { buildQuery } from 'lib/api';
import { currencyFormatter } from 'utils/formatter';
import { selectSourceById } from 'lib/slice/cartoSlice';

export const LayerStyle = {
  id: 'storesLayer',
  title: 'Store types',
  geomType: 'point',
  colors: {
    'Speciality Store': [127, 60, 141],
    'Convenience Store': [17, 165, 121],
    'Department Store': [57, 105, 172],
    Drugstore: [242, 183, 1],
    Hypermarket: [231, 63, 116],
    'Discount Store': [128, 186, 90],
    Supermarket: [80, 20, 85],
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
