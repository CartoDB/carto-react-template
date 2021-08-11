// @ts-ignore
import { WebMercatorViewport } from 'deck.gl';
import { ViewState } from '@carto/react-redux';

export function bboxToViewState(
  currentViewState: ViewState,
  bbox: [number, number, number, number],
  options: any
) {
  const [minX, minY, maxX, maxY] = bbox;
  const v = new WebMercatorViewport(currentViewState);
  const { latitude, longitude, zoom } = v.fitBounds(
    [
      [minX, minY],
      [maxX, maxY],
    ],
    options
  );
  return { latitude, longitude, zoom };
}
