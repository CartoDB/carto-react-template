import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, SwipeableDrawer, Fab, Grid, Hidden, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { BASEMAPS } from '@carto/react-basemaps';
import Map from 'components/common/Map';
import ZoomControl from 'components/common/ZoomControl';
import { getLayers } from 'components/layers';
import { setBottomSheetOpen } from 'store/appSlice';
import { ReactComponent as CartoLogoMap } from 'assets/img/carto-logo-map.svg';
import ErrorSnackbar from 'components/common/ErrorSnackbar';
import LazyLoadRoute from 'components/common/LazyLoadRoute';

const DRAWER_WIDTH = 350;

const useStyles = makeStyles((theme) => ({
  main: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  drawer: {
    flex: '0 0 auto',
    [theme.breakpoints.down('xs')]: {
      height: 95,
    },
    [theme.breakpoints.up('xs')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
}));

export default function Main() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
    <Grid container direction='row' alignItems='stretch' item xs className={classes.main}>
      <nav className={classes.drawer}>
        <Desktop />
        <Mobile />
      </nav>
      <MapContainer />
      <ErrorSnackbar />
    </Grid>
  );
}

const useStylesDesktopDrawer = makeStyles(() => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
    position: 'absolute',
  },
}));

function Desktop() {
  const classes = useStylesDesktopDrawer();

  return (
    <Hidden xsDown>
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant='permanent'
        anchor='left'
        open
      >
        <Toolbar variant='dense' />
        <Grid container item xs>
          <LazyLoadRoute>
            <Outlet />
          </LazyLoadRoute>
        </Grid>
      </Drawer>
    </Hidden>
  );
}

const useStylesMobileDrawer = makeStyles((theme) => ({
  closed: {},
  bottomSheet: {
    maxHeight: `calc(100% - ${theme.spacing(6)}px)`,

    '&$closed': {
      transform: `translateY(calc(100% - ${theme.spacing(12)}px)) !important`,
      visibility: 'visible !important',

      '& $bottomSheetContent': {
        overflow: 'hidden',
      },
    },
  },
  bottomSheetContent: {
    minHeight: theme.spacing(18),
    '& > *': {
      paddingBottom: theme.spacing(6),
    },
  },
  bottomSheetButton: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(2),
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
    transform: `translateY(${theme.spacing(3)}px)`,
    transition: `transform ${theme.transitions.easing.sharp} ${theme.transitions.duration.shortest}ms`,

    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },

    '& .MuiFab-label': {
      width: theme.spacing(9),
      justifyContent: 'flex-start',
    },

    '&$buttonShow': {
      transform: 'translateY(0)',

      '& $bottomSheetIcon': {
        transform: 'rotate(0)',
      },
    },
  },
  bottomSheetIcon: {
    color: theme.palette.text.hint,
    height: theme.spacing(4),
    transform: 'rotate(180deg)',
  },
  buttonShow: {},
}));

function Mobile() {
  const dispatch = useDispatch();
  const bottomSheetOpen = useSelector((state) => state.app.bottomSheetOpen);
  const classes = useStylesMobileDrawer();

  const handleWidgetsDrawerToggle = () => {
    dispatch(setBottomSheetOpen(!bottomSheetOpen));
  };

  return (
    <Hidden smUp implementation='css'>
      <SwipeableDrawer
        variant='persistent'
        anchor='bottom'
        open={bottomSheetOpen}
        onOpen={handleWidgetsDrawerToggle}
        onClose={handleWidgetsDrawerToggle}
        PaperProps={{
          className: `${classes.bottomSheet} ${!bottomSheetOpen ? classes.closed : ''}`,
          elevation: 8,
        }}
      >
        <div className={classes.bottomSheetContent}>
          <LazyLoadRoute>
            <Outlet />
          </LazyLoadRoute>
        </div>
      </SwipeableDrawer>
      <Fab
        variant='extended'
        size='small'
        color='inherit'
        aria-label={bottomSheetOpen ? 'Hide' : 'Show'}
        className={`${classes.bottomSheetButton} ${
          !bottomSheetOpen ? classes.buttonShow : ''
        }`}
        onClick={handleWidgetsDrawerToggle}
      >
        <ExpandLessIcon className={classes.bottomSheetIcon} />
        {bottomSheetOpen ? 'Hide' : 'Show'}
      </Fab>
    </Hidden>
  );
}

const useStylesMapContainer = makeStyles((theme) => ({
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
}));

function MapContainer() {
  const isGmaps = useSelector((state) => BASEMAPS[state.carto.basemap].type === 'gmaps');
  const classes = useStylesMapContainer();

  const layers = getLayers();

  const layers = getLayers();

  return (
    <Grid item className={`${classes.mapWrapper} ${isGmaps ? classes.gmaps : ''}`}>
      <Map layers={layers} />
      <Hidden xsDown>
        <ZoomControl className={classes.zoomControl} showCurrentZoom />
      </Hidden>
      {!isGmaps && <CartoLogoMap className={classes.cartoLogoMap} />}
    </Grid>
  );
}
