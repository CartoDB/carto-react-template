import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Drawer,
  Grid,
  Hidden,
  Paper,
  Portal,
  Snackbar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import { GeocoderWidget } from '@carto/react/widgets';
import { Map } from 'components/common/Map';
import { getLayers } from 'components/layers';
import { setError } from 'config/appSlice';

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
    maxHeight: 'calc(100% - 48px)',
  },
  bottomSheetContent: {
    minHeight: theme.spacing(16),
  },
  mapWrapper: {
    position: 'relative',
    flex: 1,
    overflow: 'hidden',
  },
  geocoder: {
    position: 'absolute',
    top: theme.spacing(3),
    left: theme.spacing(3),

    [theme.breakpoints.down('xs')]: {
      width: `calc(100% - ${theme.spacing(6)}px)`,
    },
  },
}));

export default function Main() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.app.error);
  const [widgetsDrawerOpen, setWidgetsDrawerOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const mobileContainer = React.useRef(null);
  const desktopContainer = React.useRef(null);

  const handleClose = () => {
    dispatch(setError(null));
  };

  const handleWidgetsDrawerToggle = () => {
    setWidgetsDrawerOpen(!widgetsDrawerOpen);
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
          <Paper
            className={classes.widgetDrawerToggle}
            elevation={4}
            square
            onClick={handleWidgetsDrawerToggle}
          >
            <ExpandLessIcon />
          </Paper>
          <Drawer
            variant='persistent'
            anchor='bottom'
            open={widgetsDrawerOpen}
            onClose={handleWidgetsDrawerToggle}
            PaperProps={{ className: classes.bottomSheet }}
          >
            <Box
              display='flex'
              justifyContent='center'
              onClick={handleWidgetsDrawerToggle}
            >
              <ExpandMoreIcon />
            </Box>
            <div ref={mobileContainer} className={classes.bottomSheetContent}></div>
          </Drawer>
        </Hidden>
      </nav>

      <Grid item className={classes.mapWrapper}>
        <Map layers={getLayers()} />
        <GeocoderWidget className={classes.geocoder} onError={onGeocoderWidgetError} />
      </Grid>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity='error'>{error}</Alert>
      </Snackbar>
    </Grid>
  );
}
