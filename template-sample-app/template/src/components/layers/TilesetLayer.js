import { useSelector } from 'react-redux';
import { CartoBQTilerLayer, colorBins } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import htmlForFeature from '../../utils/htmlForFeature';

export const TILESET_LAYER_ID = 'tilesetLayer';

function TilesetLayer() {
  const { tilesetLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, tilesetLayer?.source));
  const cartoFilterProps = useCartoLayerFilterProps(source, 'geoid');

  if (tilesetLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoFilterProps,
      id: TILESET_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      stroked: false,
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      pickable: true,
      getFillColor: colorBins({
        attr: 'total_pop',
        // states
        // domain: [1e6, 3e6, 6e6, 8e6, 10e6],
        // counties and zip codes
        // domain: [900, 1000, 4000, 8000, 10000],
        domain: [900, 1000, 4000, 8000, 10000],
        colors: 'Temps',
      }),
      pointRadiusMinPixels: 2,
      onHover: (info) => {
        if (info && info.object) {
          info.object = {
            html: htmlForFeature(info.object),
          };
        }
      },
    });
  }
}

export default TilesetLayer;
