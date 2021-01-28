import { useSelector } from 'react-redux';
import { GeoJsonLayer } from '@deck.gl/layers';

export const ISOCHRONE_LAYER_ID = 'isolineLayer';

export default function IsochroneLayer() {
  const { isolineLayer } = useSelector((state) => state.carto.layers);
  const isolineResult = useSelector((state) => state.app.isolineResult);

  if (isolineLayer && isolineResult) {
    return new GeoJsonLayer({
      id: ISOCHRONE_LAYER_ID,
      data: isolineResult,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 1,
      getFillColor: [71, 219, 153, 80],
      getLineColor: [71, 219, 153],
    });
  }
}
