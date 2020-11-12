import { useSelector } from 'react-redux';
import { GeoJsonLayer } from '@deck.gl/layers';
import { selectSourceById } from 'config/cartoSlice';

export default function IsolineLayer() {
  const { isolineLayer } = useSelector((state) => state.carto.layers);
  const isolineResult = useSelector((state) => state.carto.isolineResult);

  if (isolineLayer && isolineResult) {
    return new GeoJsonLayer({
      id: 'isolineLayer',
      data: isolineResult,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 1,
      getFillColor: [71, 219, 153, 80],
      getLineColor: [71, 219, 153],
    });
  }
}
