import { useSelector } from 'react-redux';
import { CartoBQTilerLayer, colorBins } from '@deck.gl/carto';
import { PathLayer } from '@deck.gl/layers';
import { selectSourceById } from '@carto/react/redux';
import { useCartoLayerFilterProps } from '@carto/react/api';
import htmlForFeature from 'utils/htmlForFeature';

export const TILESET_LAYER_ID = 'tilesetLayer';

function TilesetLayer() {
  const { tilesetLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, tilesetLayer?.source));
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (tilesetLayer && source) {
    return new CartoBQTilerLayer({
      ...cartoFilterProps,
      id: TILESET_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      stroked: false,
      pointRadiusUnits: 'pixels',
      lineWidthUnits: 'pixels',
      pickable: false,
      getFillColor: colorBins({
        attr: 'aggregated_total',
        domain: [10, 100, 1e3, 1e4, 1e5, 1e6],
        colors: 'Temps',
      }),
      pointRadiusMinPixels: 2,
      // onHover: (info) => {
      //   if (info && info.object) {
      //     info.object = {
      //       html: htmlForFeature({
      //         title: 'Aggregated total',
      //         feature: info.object,
      //         formatter: {
      //           type: 'number',
      //           columns: ['aggregated_total'],
      //         },
      //         includeColumns: ['aggregated_total'],
      //       }),
      //     };
      //   }
      // },
      // renderSubLayers: props => {
      //   const {
      //     bbox: {west, south, east, north}
      //   } = props.tile;

      //   return [
      //     new PathLayer({
      //       id: `${props.id}-border`,
      //       visible: props.visible,
      //       data: [[[west, north], [west, south], [east, south], [east, north], [west, north]]],
      //       getPath: d => d,
      //       getColor: [255, 0, 0],
      //       widthMinPixels: 4
      //     })
      //   ];
      // }
    });
  }
}

export default TilesetLayer;
