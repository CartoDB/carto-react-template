import { lazy } from 'react';
import { BASEMAPS } from '@carto/react-basemaps';
import ZoomControl from 'components/common/ZoomControl';
import { getLayers } from 'components/layers';
import { ReactComponent as CartoLogoMap } from 'assets/img/carto-logo-map.svg';
import { useSelector } from 'react-redux';
import { Grid, useMediaQuery, Theme, GridProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const Map = lazy(
  () => import(/* webpackChunkName: 'map' */ 'components/common/map/Map'),
);

type GridMapWrapperProps = GridProps & { isGmaps: boolean };
const GridMapWrapper = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'isGmaps',
})<GridMapWrapperProps>(({ isGmaps, theme }) => ({
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

const StyledCartoLogoMap = styled(CartoLogoMap)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(4),
  left: '50%',
  transform: 'translateX(-50%)',
}));

export default function MapContainer() {
  const isGmaps = useSelector(
    // @ts-ignore
    (state) => BASEMAPS[state.carto.basemap].type === 'gmaps',
  );
  const layers = getLayers();

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <GridMapWrapper item isGmaps={isGmaps}>
      <Map layers={layers} />
      {hidden ? null : (
        <StyledZoomControl showCurrentZoom className='zoomControl' />
      )}
      {!isGmaps && <StyledCartoLogoMap />}
    </GridMapWrapper>
  );
}
