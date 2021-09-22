import { useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { RootState } from 'store/store';

export const EXAMPLE_LAYER_ID = 'exampleLayer';

export default function ExampleLayer() {
  const { exampleLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, exampleLayer?.source),
  );
  const cartoLayerProps = useCartoLayerProps({ source });

  if (exampleLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: EXAMPLE_LAYER_ID,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      pickable: true,
      onHover: (info: any) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
      },
    });
  }
}
