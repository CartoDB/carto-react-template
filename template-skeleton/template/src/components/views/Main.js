import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, SwipeableDrawer, Grid, Hidden, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { BASEMAPS } from '@carto/react-basemaps';
import Map from 'components/common/Map';
import ZoomControl from 'components/common/ZoomControl';
import ErrorSnackbar from 'components/common/ErrorSnackbar';
import getLayers from 'components/layers';
import { setBottomSheetOpen } from 'store/appSlice';
import { ReactComponent as CartoLogoMap } from 'assets/img/carto-logo-map.svg';

const DRAWER_WIDTH = 350;

const useStyles = makeStyles((theme) => ({
  main: {
    flex: '1 1 auto',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    alignItems: 'flex-end',
    position: 'relative',
  },
  drawer: {
    [theme.breakpoints.down('sm')]: {
      height: '95px',
    },
  },
}));

export default function Main() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.main}>
      <MapContainer />
      <nav className={classes.drawer}>
        <DesktopDrawer />
        <MobileDrawer />
      </nav>
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

function DesktopDrawer() {
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
        <Outlet />
      </Drawer>
    </Hidden>
  );
}

const useStylesMobileDrawer = makeStyles((theme) => ({
  drawer: {
    height: '100%',
    flexShrink: 0,
  },
  drawerOpen: {
    height: '100%',
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    height: 95,
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowY: 'hidden',
  },
  paper: {
    position: 'absolute',
  },
  bottomSheetButton: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(2),
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,

    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  bottomSheetIcon: {
    color: theme.palette.text.hint,
    height: theme.spacing(4),
  },
}));

function MobileDrawer() {
  const dispatch = useDispatch();
  const bottomSheetOpen = useSelector((state) => state.app.bottomSheetOpen);
  const classes = useStylesMobileDrawer();

  const handleWidgetsDrawerToggle = () => {
    dispatch(setBottomSheetOpen(!bottomSheetOpen));
  };

  return (
    <Hidden smUp>
      <SwipeableDrawer
        variant='permanent'
        anchor='bottom'
        open={bottomSheetOpen}
        className={`${classes.drawer} ${
          bottomSheetOpen ? classes.drawerOpen : classes.drawerClose
        }`}
        onOpen={handleWidgetsDrawerToggle}
        onClose={handleWidgetsDrawerToggle}
        elevation={8}
        classes={{
          paper: `${classes.drawer} ${classes.paper} ${
            bottomSheetOpen ? classes.drawerOpen : classes.drawerClose
          }`,
        }}
      >
        <Outlet />
      </SwipeableDrawer>
      <Fab
        variant='extended'
        size='small'
        color='inherit'
        aria-label={bottomSheetOpen ? 'Hide' : 'Show'}
        className={classes.bottomSheetButton}
        onClick={handleWidgetsDrawerToggle}
      >
        {bottomSheetOpen ? (
          <ExpandMoreIcon className={classes.bottomSheetIcon} />
        ) : (
          <ExpandLessIcon className={classes.bottomSheetIcon} />
        )}
        {!bottomSheetOpen && 'Show'}
      </Fab>
    </Hidden>
  );
}

const useStylesMapContainer = makeStyles((theme) => ({
  mapWrapper: {
    position: 'relative',
    overflow: 'hidden',
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    flex: '1 1 auto',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  zoomControl: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: theme.spacing(4),
    zIndex: 1,

    [theme.breakpoints.down('sm')]: {
      left: theme.spacing(2),
    },
  },
  gmaps: {
    '& $zoomControl': {
      bottom: theme.spacing(5),
    },
  },
  cartoLogoMap: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: '50%',
    transform: 'translateX(-50%)',

    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(4.75),
    },
  },
}));

function MapContainer() {
  const classes = useStylesMapContainer();
  const isGmaps = useSelector((state) => BASEMAPS[state.carto.basemap].type === 'gmaps');

  const layers = getLayers();
  return (
    <Grid item className={`${classes.mapWrapper} ${isGmaps ? classes.gmaps : ''}`}>
      <Map layers={layers} />
      <ZoomControl className={classes.zoomControl} showCurrentZoom={true} />
      {!isGmaps && <CartoLogoMap className={classes.cartoLogoMap} />}
    </Grid>
  );
}
