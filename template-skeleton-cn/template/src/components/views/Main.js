import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Drawer,
  SwipeableDrawer,
  Fab,
  Grid,
  Hidden,
  Portal,
  Snackbar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { BASEMAPS } from '@carto/react-basemaps';
import Map from 'components/common/Map';
import ZoomControl from 'components/common/ZoomControl';
import { getLayers } from 'components/layers';
import { setBottomSheetOpen, setError } from 'store/appSlice';
import cartoLogoMap from 'assets/img/carto-logo-map.svg';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  widgetDrawerToggle: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
    textAlign: 'center',
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
  closed: {},
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
  mapWrapper: {
    position: 'relative',
    flex: 1,
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
  },
  zoomControl: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: theme.spacing(4),
    zIndex: 1,

    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(4),
      left: theme.spacing(2),
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

    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(13.5),
    },
  },
  gmaps: {
    '& $zoomControl': {
      left: theme.spacing(4),
      bottom: theme.spacing(5),
    },
  },
}));

function Main() {
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const mobileContainer = useRef(null);
  const desktopContainer = useRef(null);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.app.error);
  const bottomSheetOpen = useSelector((state) => state.app.bottomSheetOpen);
  const isGmaps = useSelector((state) => BASEMAPS[state.carto.basemap].type === 'gmaps');

  // [hygen] Add useEffect

  const handleClose = () => {
    dispatch(setError(null));
  };

  const handleWidgetsDrawerToggle = () => {
    dispatch(setBottomSheetOpen(!bottomSheetOpen));
  };

  return (
    <Grid container direction='row' alignItems='stretch' item xs>
      <nav className={classes.drawer}>
        <Portal container={isMobile ? mobileContainer.current : desktopContainer.current}>
          <Outlet />
        </Portal>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            PaperProps={{
              elevation: 8,
            }}
            open
          >
            <Toolbar variant='dense' />
            <Grid container item xs ref={desktopContainer} />
          </Drawer>
        </Hidden>
        <Hidden smUp implementation='css'>
          <SwipeableDrawer
            variant='persistent'
            anchor='bottom'
            open={bottomSheetOpen}
            onOpen={handleWidgetsDrawerToggle}
            onClose={handleWidgetsDrawerToggle}
            PaperProps={{
              className: `${classes.bottomSheet} ${
                !bottomSheetOpen ? classes.closed : ''
              }`,
              elevation: 8,
            }}
          >
            <div ref={mobileContainer} className={classes.bottomSheetContent} />
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
      </nav>

      <Grid item className={`${classes.mapWrapper} ${isGmaps ? classes.gmaps : ''}`}>
        <Map layers={getLayers()} />
        <Hidden xsDown>
          <ZoomControl className={classes.zoomControl} />
        </Hidden>
        {!isGmaps && (
          <img src={cartoLogoMap} alt='CARTO' className={classes.cartoLogoMap} />
        )}
      </Grid>

      <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity='error'>{error}</Alert>
      </Snackbar>
    </Grid>
  );
}

export default Main;
