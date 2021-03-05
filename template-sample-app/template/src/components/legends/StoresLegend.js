import { useSelector } from 'react-redux';
import rgbToHex from 'utils/rgbToHex';
import { CATEGORY_COLORS, STORES_LAYER_ID } from 'components/layers/StoresLayer';
import { LegendWidget } from '@carto/react/widgets';

function StoresLegend() {
  const { storesLayer } = useSelector((state) => state.carto.layers);

  if (!storesLayer) return null;

  const layers = [
    {
      id: STORES_LAYER_ID,
      title: 'Store types',
      visibility: true,
      max: 0, // TODO: Extract max category from layer?
      type: 'category',
      info: null,
      data: Object.entries(CATEGORY_COLORS).map((elem) => {
        return { color: rgbToHex(elem[1]), label: elem[0] };
      }),
    },
  ];

  return <LegendWidget layers={layers}></LegendWidget>;
}

export default StoresLegend;
