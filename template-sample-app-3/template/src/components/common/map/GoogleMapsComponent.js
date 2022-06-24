import { useSelector } from 'react-redux';
import 'maplibre-gl/dist/maplibre-gl.css';
import { BASEMAPS, GoogleMap } from '@carto/react-basemaps';
import { useMapHooks } from './useMapHooks';

export default function GoogleMapsComponent({ layers }) {
  const viewState = useSelector((state) => state.carto.viewState);
  const basemap = useSelector((state) => BASEMAPS[state.carto.basemap]);
  const googleApiKey = useSelector((state) => state.carto.googleApiKey);
  const googleMapId = useSelector((state) => state.carto.googleMapId);
  const { handleSizeChange, handleTooltip, handleViewStateChange } = useMapHooks();

  return (
    <GoogleMap
      basemap={basemap}
      apiKey={googleApiKey}
      mapId={googleMapId}
      viewState={{ ...viewState }}
      layers={layers}
      onViewStateChange={handleViewStateChange}
      onResize={handleSizeChange}
      getTooltip={handleTooltip}
    />
  );
}
