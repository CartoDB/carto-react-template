import { useSelector } from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BASEMAPS, GoogleMap } from '@carto/react-basemaps';
import { useMapHooks } from './useMapHooks';
import { RootState } from 'store/store';

export default function GoogleMapsComponent({ layers }: { layers: any[] }) {
  const viewState = useSelector((state: RootState) => state.carto.viewState);
  const basemap = useSelector(
    // @ts-ignore
    (state: RootState) => BASEMAPS[state.carto.basemap],
  );
  const googleApiKey = useSelector(
    (state: RootState) => state.carto.googleApiKey,
  );
  const googleMapId = useSelector(
    (state: RootState) => state.carto.googleMapId,
  );

  const { handleSizeChange, handleTooltip, handleViewStateChange } =
    useMapHooks();

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
