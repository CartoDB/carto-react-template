import { lazy } from 'react';
import { BASEMAPS } from '@carto/react-basemaps';
import ZoomControl from 'components/common/ZoomControl';
import { getLayers } from 'components/layers';
import { ReactComponent as CartoLogoMap } from 'assets/img/carto-logo-map.svg';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector } from 'react-redux';
import { Grid, Theme, useMediaQuery } from '@mui/material';
// import { CustomTheme } from 'theme';

const Map = lazy(
  () => import(/* webpackChunkName: 'map' */ 'components/common/map/Map'),
);

const useStyles = makeStyles((theme) => ({
  mapWrapper: {
    position: 'relative',
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',

    // [theme.breakpoints.down('xs')]: {
    //   height: `calc(100% - calc(${theme.spacing(12)} - 1px))`, // Minus 1 to fix that weirdly sometimes the bottom sheet is 1px lower than needed
    // },

    // Fix Mapbox attribution button not clickable
    '& #deckgl-wrapper': {
      '& #deckgl-overlay': {
        zIndex: 1,
      },
      '& #view-default-view > div': {
        zIndex: 'auto !important',
      },
    },
  },
  zoomControl: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: theme.spacing(4),
    zIndex: 1,

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  cartoLogoMap: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: '50%',
    transform: 'translateX(-50%)',
  },
  gmaps: {
    '& $zoomControl': {
      left: theme.spacing(4),
      bottom: theme.spacing(5),
    },
  },
}));

export default function MapContainer() {
  const isGmaps = useSelector(
    // @ts-ignore
    (state) => BASEMAPS[state.carto.basemap].type === 'gmaps',
  );
  const classes = useStyles();
  const layers = getLayers();

  // const hidden = useMediaQuery((theme: CustomTheme) =>
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Grid
      item
      className={`${classes.mapWrapper} ${isGmaps ? classes.gmaps : ''}`}
    >
      <Map layers={layers} />
      {hidden ? null : (
        <ZoomControl className={classes.zoomControl} showCurrentZoom />
      )}
      {!isGmaps && <CartoLogoMap className={classes.cartoLogoMap} />}
    </Grid>
  );
}
