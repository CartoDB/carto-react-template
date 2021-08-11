import { useSelector } from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BASEMAPS, GoogleMap } from '@carto/react-basemaps';
import { useMapHooks } from './useMapHooks';
import { RootState } from 'store/store';

export default function GoogleMapsComponent({ layers }: { layers: Array<any> }) {
  const viewState = useSelector((state: RootState) => state.carto.viewState);
  // @ts-ignore
  const basemap = useSelector((state) => BASEMAPS[state.carto.basemap]);
  const googleApiKey = useSelector((state: RootState) => state.carto.googleApiKey);
  const { handleSizeChange, handleTooltip, handleViewStateChange } = useMapHooks();

  return (
    // @ts-ignore
    <GoogleMap
      basemap={basemap}
      apiKey={googleApiKey}
      viewState={{ ...viewState }}
      layers={layers}
      onViewStateChange={handleViewStateChange}
      onResize={handleSizeChange}
      getTooltip={handleTooltip}
    />
  );
}
