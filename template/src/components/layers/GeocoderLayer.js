import { useSelector } from 'react-redux';
import { IconLayer } from '@deck.gl/layers';

export default function GeocoderLayer() {
  const { geocoderLayer } = useSelector((state) => state.carto.layers);
  const geocoderResult = useSelector((state) => state.carto.geocoderResult);

  if (geocoderLayer && geocoderResult) {
    const data = [{ coordinates: [geocoderResult.longitude, geocoderResult.latitude] }];

    return new IconLayer({
      id: `geocoding-icon-layer`,
      getIcon: () => {
        return {
          url: './geocoderMarker.svg',
          width: 56,
          height: 65,
          anchorY: 65,
        };
      },
      data,
      getPosition: (d) => d.coordinates,
      getSize: 65,
      sizeUnits: 'pixels',
      sizeScale: 1.4,
      opacity: 1,
    });
  }
}
