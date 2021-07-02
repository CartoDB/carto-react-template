import DeckGL from '@deck.gl/react';
import { useSelector } from 'react-redux';
import { StaticMap } from 'react-map-gl';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { BASEMAPS } from '@carto/react-basemaps';
import { useMapHooks } from './useMapHooks';

export default function DeckGLComponent({ layers }) {
  const viewState = useSelector((state) => state.carto.viewState);
  const basemap = useSelector((state) => BASEMAPS[state.carto.basemap]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const {
    handleCursor,
    handleHover,
    handleSizeChange,
    handleTooltip,
    handleViewStateChange,
  } = useMapHooks();

  return (
    <DeckGL
      viewState={{ ...viewState }}
      controller={true}
      layers={layers}
      onViewStateChange={handleViewStateChange}
      onResize={handleSizeChange}
      onHover={handleHover}
      getCursor={handleCursor}
      getTooltip={handleTooltip}
      pickingRadius={isMobile ? 10 : 0}
    >
      <StaticMap reuseMaps mapStyle={basemap.options.mapStyle} preventStyleDiffing />
    </DeckGL>
  );
}
