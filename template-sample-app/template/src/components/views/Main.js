import React from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Drawer,
  SwipeableDrawer,
  Grid,
  Hidden,
  Portal,
  Snackbar,
  SvgIcon,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { GeocoderWidget } from '@carto/react/widgets';
import { Map } from 'components/common/Map';
import { Legend } from 'components/legends/Legend';
import { ZoomControl } from 'components/common/ZoomControl';
import { getLayers } from 'components/layers';
import { setBottomSheetOpen, setError } from 'config/appSlice';

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

      '& $bottomSheetIcon': {
        transform: 'rotate(0)',
      },

      '& $bottomSheetContent': {
        overflow: 'hidden',
      },
    },
  },
  closed: {},
  bottomSheetContent: {
    minHeight: theme.spacing(18),
  },
  bottomSheetIcon: {
    color: theme.palette.text.hint,
    height: theme.spacing(4),
    transform: 'rotate(180deg)',
  },
  mapWrapper: {
    position: 'relative',
    flex: 1,
    overflow: 'hidden',

    // Fix Mapbox attribution button not clickable
    // TODO: Test GMaps
    '& #deckgl-wrapper': {
      '& #deckgl-overlay': {
        zIndex: 1,
      },
      '& #view-default-view > div': {
        zIndex: 'auto !important',
      },
    },
  },
  legend: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(8),
      left: theme.spacing(2),
      right: 'auto',
    },

    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(14),
    },
  },
  geocoder: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 1,

    [theme.breakpoints.down('xs')]: {
      width: `calc(100% - ${theme.spacing(4)}px)`,
    },
  },
  zoomControl: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const ArrowIcon = (props) => (
  <SvgIcon width='24' height='8' viewBox='0 0 24 8' className={props.className}>
    <path
      d='M176 18.214L188 12 200 18.214 199.138 20 188 14.233 176.862 20z'
      transform='translate(-176 -606) translate(0 594)'
      fill='inherit'
    />
  </SvgIcon>
);

export default function Main() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.app.error);
  const bottomSheetOpen = useSelector((state) => state.app.bottomSheetOpen);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const mobileContainer = React.useRef(null);
  const desktopContainer = React.useRef(null);

  const handleClose = () => {
    dispatch(setError(null));
  };

  const handleWidgetsDrawerToggle = () => {
    dispatch(setBottomSheetOpen(!bottomSheetOpen));
  };

  const onGeocoderWidgetError = (error) => {
    dispatch(setError(`Geocoding error: ${error.message}`));
  };

  return (
    <Grid container direction='row' alignItems='stretch' item xs>
      <nav className={classes.drawer}>
        <Portal container={isMobile ? mobileContainer.current : desktopContainer.current}>
          <Outlet />
        </Portal>
        <Hidden xsDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            <Toolbar variant='dense' />
            <div ref={desktopContainer}></div>
          </Drawer>
        </Hidden>
        <Hidden smUp>
          <SwipeableDrawer
            variant='persistent'
            anchor='bottom'
            open={bottomSheetOpen}
            onOpen={handleWidgetsDrawerToggle}
            onClose={handleWidgetsDrawerToggle}
            PaperProps={{
              className: `${classes.bottomSheet} ${!bottomSheetOpen && classes.closed}`,
            }}
          >
            <Box
              display='flex'
              justifyContent='center'
              onClick={handleWidgetsDrawerToggle}
            >
              <ArrowIcon className={classes.bottomSheetIcon} />
            </Box>
            <div ref={mobileContainer} className={classes.bottomSheetContent}></div>
          </SwipeableDrawer>
        </Hidden>
      </nav>

      <Grid item className={classes.mapWrapper}>
        <Map layers={getLayers()} />
        <GeocoderWidget className={classes.geocoder} onError={onGeocoderWidgetError} />
        <Legend className={classes.legend} />
        <Hidden xsDown>
          <ZoomControl className={classes.zoomControl} />
        </Hidden>
      </Grid>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity='error'>{error}</Alert>
      </Snackbar>
    </Grid>
  );
}
