import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Tab, Tabs, Toolbar, Grid, Link } from '@material-ui/core';
import { Map } from 'components/common/Map';
import { Legend } from 'components/legends/Legend';
import { GeocoderWidget } from 'lib/sdk';
import UserMenu from 'components/views/UserMenu';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  navBar: {
    boxShadow: 'none',
  },
  logo: {
    height: '36px',
    '& img': {
      height: '100%',
    },
  },
  navTabs: {
    alignSelf: 'flex-end',
    flex: '1 1 100%',

    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.common.white,
    },
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'start',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  sidebarWrapper: {
    position: 'relative',
    width: '350px',
    height: '100%',
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[3],
    overflow: 'auto',
    zIndex: 1,
  },
  mapWrapper: {
    position: 'relative',
    width: 'calc(100% - 350px)',
    height: '100%',
    overflow: 'hidden',
  },
  legend: {
    position: 'absolute',
    bottom: theme.spacing(3.5),
    right: theme.spacing(4),
  },
  geocoder: {
    position: 'absolute',
    top: theme.spacing(3.5),
    marginLeft: theme.spacing(4),
  },
}));

export default function Home() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Grid container direction='column' className={classes.grid}>
      <CssBaseline />
      <AppBar position='static' className={classes.navBar}>
        <Toolbar>
          <Link component={NavLink} to='/' className={classes.logo}>
            <img src='/logo.svg' alt='CARTO logo' />
          </Link>
          <Grid container justify='center' className={classes.navTabs}>
            <Tabs value={location.pathname.split('/')[1]}>
              <Tab
                label='Stores'
                value='stores'
                component={NavLink}
                to='/stores'
                className={classes.navLink}
              />
              <Tab
                label='KPI'
                value='kpi'
                component={NavLink}
                to='/kpi'
                className={classes.navLink}
              />
              <Tab
                label='Datasets'
                value='datasets'
                component={NavLink}
                to='/datasets'
                className={classes.navLink}
              />
            </Tabs>
          </Grid>
          <Grid container item xs={3}>
            <UserMenu />
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container direction='row' className={classes.contentWrapper}>
        <Grid
          container
          direction='column'
          alignItems='stretch'
          item
          className={classes.sidebarWrapper}
        >
          <Outlet />
        </Grid>
        <Grid item className={classes.mapWrapper}>
          <Map />
          <GeocoderWidget className={classes.geocoder} />
          <Legend className={classes.legend} />
        </Grid>
      </Grid>
    </Grid>
  );
}
