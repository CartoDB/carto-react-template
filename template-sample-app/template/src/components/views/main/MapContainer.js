import { lazy } from 'react';
import { BASEMAPS } from '@carto/react-basemaps';
import ZoomControl from 'components/common/ZoomControl';
import { getLayers } from 'components/layers';
import { ReactComponent as CartoLogoMap } from 'assets/img/carto-logo-map.svg';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Hidden } from '@material-ui/core';
import { GeocoderWidget, LegendWidget } from '@carto/react-widgets';
import { setError } from 'store/appSlice';

const Map = lazy(() => import(/* webpackChunkName: 'map' */ 'components/common/map/Map'));

const useStyles = makeStyles((theme) => ({
  mapWrapper: {
    position: 'relative',
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',

    // [theme.breakpoints.down('xs')]: {
    //   height: `calc(100% - ${theme.spacing(12) - 1}px)`, // Minus 1 to fix that weirdly sometimes the bottom sheet is 1px lower than needed
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

    [theme.breakpoints.down('xs')]: {
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
  geocoder: {
    position: 'absolute',
    top: theme.spacing(4),
    left: theme.spacing(4),
    zIndex: 1,

    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(2),
      left: theme.spacing(2),
      width: `calc(100% - ${theme.spacing(4)}px)`,
    },
  },
  legend: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(10),
      right: theme.spacing(2),
    },

    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(18.5),
      right: theme.spacing(2),
    },
  },
}));

export default function MapContainer() {
  const dispatch = useDispatch();
  const isGmaps = useSelector((state) => BASEMAPS[state.carto.basemap].type === 'gmaps');
  const classes = useStyles();

  const onGeocoderWidgetError = (error) => {
    dispatch(setError(`Geocoding error: ${error.message}`));
  };

  const layers = getLayers();

  return (
    <Grid item className={`${classes.mapWrapper} ${isGmaps ? classes.gmaps : ''}`}>
      <Map layers={layers} />
      <Hidden xsDown>
        <ZoomControl className={classes.zoomControl} showCurrentZoom />
      </Hidden>
      {!isGmaps && <CartoLogoMap className={classes.cartoLogoMap} />}
      <GeocoderWidget className={classes.geocoder} onError={onGeocoderWidgetError} />
      <LegendWidget className={classes.legend} />
    </Grid>
  );
}
