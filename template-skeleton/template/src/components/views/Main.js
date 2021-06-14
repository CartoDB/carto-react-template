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
    flex: 1,
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    alignItems: 'flex-end',
  },
}));

export default function Main() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.main}>
      <DesktopDrawer />
      <MobileDrawer />
      <MapContainer />
      <ErrorSnackbar />
    </Grid>
  );
}

const useStylesDesktopDrawer = makeStyles(() => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
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
  closed: {},
  buttonShow: {
    transform: 'translateY(0)',

    '& $bottomSheetIcon': {
      transform: 'rotate(0)',
    },
  },
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
  bottomSheetIcon: {
    color: theme.palette.text.hint,
    height: theme.spacing(4),
    transform: 'rotate(180deg)',
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
          <Outlet />
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
        {bottomSheetOpen ? (
          <ExpandLessIcon className={classes.bottomSheetIcon} />
        ) : (
          <ExpandMoreIcon className={classes.bottomSheetIcon} />
        )}
        {bottomSheetOpen ? 'Hide' : 'Show'}
      </Fab>
    </Hidden>
  );
}

const useStylesMapContainer = makeStyles((theme) => ({
  mapWrapper: {
    position: 'relative',
    flex: 1,
    overflow: 'hidden',
    width: `calc(100% - ${DRAWER_WIDTH}px)`,

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      maxHeight: `calc(100% - 95px)`,
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
      <ZoomControl className={classes.zoomControl} />
      {!isGmaps && <CartoLogoMap className={classes.cartoLogoMap} />}
    </Grid>
  );
}
