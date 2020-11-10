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
          url: './geocoderMarker.png',
          width: 100,
          height: 143,
          anchorY: 143,
        };
      },
      data,
      getPosition: (d) => d.coordinates,
      getSize: 70,
      sizeUnits: 'pixels',
      sizeScale: 1,
      opacity: 1,
    });
  }
}
