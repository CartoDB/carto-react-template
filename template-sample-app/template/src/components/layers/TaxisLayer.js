import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartoBQTilerLayer } from '@deck.gl/carto';

import { buildQueryFilters } from '@carto/react/api';
import {
  selectSourceById,
  setViewportFeatures as setVF,
  removeViewportFeatures as removeVF,
} from '@carto/react/redux';

import { scaleThreshold } from 'd3-scale';
import useRenderedFeatures from './hooks/useRenderedFeatures';
import { currencyFormatter } from 'utils/formatter';
import { debounce } from 'utils/debounce';

// CARTO Colors BluYI. https://carto.com/carto-colors/
export const COLORS = [
  [247, 254, 174],
  [183, 230, 165],
  [124, 203, 162],
  [70, 174, 160],
  [4, 82, 117],
];

const BREAKS = [0, 25, 50, 75, 100];

const INDEX_COLOR_SCALE = scaleThreshold().domain(BREAKS).range(COLORS);

function getFillColor(f) {
  return INDEX_COLOR_SCALE(f.properties.avg_fare_amount);
}

export default function TaxisLayer() {
  const dispatch = useDispatch();
  const { taxisLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, taxisLayer?.source));
  const [onViewportChange, clearFeatures] = useRenderedFeatures(
    dispatch,
    setVF,
    removeVF,
    taxisLayer?.id
  );

  useEffect(() => {
    // Clean up viewport features
    return () => clearFeatures();
  }, [clearFeatures]);

  if (taxisLayer && source) {
    return new CartoBQTilerLayer({
      id: 'storesPointLayer',
      data: source.type === 'TileLayer' ? source.data : buildQueryFilters(source),
      credentials: source.credentials,
      stroked: false,
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      pickable: true,
      getFillColor: getFillColor,
      getRadius: 2,
      onHover: (info) => {
        if (info && info.object) {
          const formattedAmount = currencyFormatter(
            info.object.properties.avg_fare_amount
          );
          info.object = {
            html: `
              <strong>Avg fare amount</strong><br>
              ${formattedAmount.prefix}${formattedAmount.value}
            `,
          };
        }
      },
      ...(source.type === 'TileLayer' && {
        onViewportChange: debounce(onViewportChange, 500),
      }),
    });
  }
}
