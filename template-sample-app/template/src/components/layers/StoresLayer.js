import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartoSQLLayer } from '@deck.gl/carto';

import { buildQueryFilters } from '@carto/react/api';
import {
  selectSourceById,
  setViewportFeatures as setVF,
  removeViewportFeatures as removeVF,
} from '@carto/react/redux';

import useRenderedFeatures from './hooks/useRenderedFeatures';

import { currencyFormatter } from 'utils/formatter';
import { debounce } from 'utils/debounce';

export const CATEGORY_COLORS = {
  Supermarket: [80, 20, 85],
  'Discount Store': [128, 186, 90],
  Hypermarket: [231, 63, 116],
  Drugstore: [242, 183, 1],
  'Department Store': [57, 105, 172],
  Others: [17, 165, 121],
};

export default function StoresLayer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { storesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, storesLayer?.source));
  const [onViewportChange, clearFeatures] = useRenderedFeatures(
    dispatch,
    setVF,
    removeVF,
    source?.id
  );

  useEffect(() => {
    // Clean up viewport features
    return () => clearFeatures();
  }, [clearFeatures]);

  if (storesLayer && source) {
    return new CartoSQLLayer({
      id: 'storesPointLayer',
      data: source.sourceType === 'TileLayer' ? source.data : buildQueryFilters(source),
      credentials: source.credentials,
      stroked: true,
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      pickable: true,
      getFillColor: (store) =>
        CATEGORY_COLORS[store.properties.storetype] || CATEGORY_COLORS['Others'],
      getLineColor: (info) => [0, 0, 0],
      getRadius: (info) =>
        info.properties.store_id === storesLayer.selectedStore ? 6 : 2,
      getLineWidth: (info) =>
        info.properties.store_id === storesLayer.selectedStore ? 2 : 0,
      onHover: (info) => {
        if (info && info.object) {
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
        if (info && info.object) {
          navigate(`/stores/${info.object.properties.store_id}`);
        }
      },
      uniqueIdProperty: 'cartodb_id',
      updateTriggers: {
        getRadius: { selectedStore: storesLayer.selectedStore },
        getLineWidth: { selectedStore: storesLayer.selectedStore },
      },
      ...(source.sourceType === 'TileLayer' && {
        onViewportChange: debounce(onViewportChange, 500),
      }),
    });
  }
}
