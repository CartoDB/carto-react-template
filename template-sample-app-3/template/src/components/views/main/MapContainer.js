import { lazy } from 'react';
import { BASEMAPS } from '@carto/react-basemaps';
import ZoomControl from 'components/common/ZoomControl';
import { getLayers } from 'components/layers';
import { ReactComponent as CartoLogoMap } from 'assets/img/carto-logo-map.svg';
import { useSelector } from 'react-redux';
import { FeatureSelectionWidget, LegendWidget } from '@carto/react-widgets';
import { Box, Grid, Hidden } from '@mui/material';
import { styled } from '@mui/material/styles';

const Map = lazy(() => import(/* webpackChunkName: 'map' */ 'components/common/map/Map'));

const GridMapWrapper = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'isGmaps',
})(({ isGmaps, theme }) => ({
  position: 'relative',
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',

  // Fix Mapbox attribution button not clickable
  '& #deckgl-wrapper': {
    '& #deckgl-overlay': {
      zIndex: 1,
    },
    '& #view-default-view > div': {
      zIndex: 'auto !important',
    },
  },
  ...(isGmaps && {
    '& .zoomControl': {
      left: theme.spacing(4),
      bottom: theme.spacing(5),
    },
  }),
}));

const StyledZoomControl = styled(ZoomControl)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(4),
  left: theme.spacing(4),
  zIndex: 1,

  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const FeatureSelectionWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(4),
  left: theme.spacing(4),
  zIndex: 1,

  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const StyledCartoLogoMap = styled(CartoLogoMap)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(4),
  left: '50%',
  transform: 'translateX(-50%)',
}));

const LegendWidgetWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(4),
  right: theme.spacing(4),

  [theme.breakpoints.down('md')]: {
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },

  [theme.breakpoints.down('sm')]: {
    bottom: theme.spacing(18.5),
    right: theme.spacing(2),
  },
}));

export default function MapContainer() {
  const isGmaps = useSelector((state) => BASEMAPS[state.carto.basemap].type === 'gmaps');

  const layers = getLayers();

  return (
    <GridMapWrapper item isGmaps={isGmaps}>
      <Map layers={layers} />
      <Hidden mdDown>
        <StyledZoomControl showCurrentZoom className='zoomControl' />
        <FeatureSelectionWrapper>
          <FeatureSelectionWidget />
        </FeatureSelectionWrapper>
      </Hidden>
      {!isGmaps && <StyledCartoLogoMap />}
      <LegendWidgetWrapper>
        <LegendWidget />
      </LegendWidgetWrapper>
    </GridMapWrapper>
  );
}
