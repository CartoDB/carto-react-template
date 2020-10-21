import React from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Grid, Link, IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Map } from 'components/common/map/Map';

const linkStyles = {
  height: '48px',
  padding: '0 46px',
  textTransform: 'uppercase',
};

function Home() {
  return (
    <Grid container direction='column' style={{ height: '100vh' }}>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>
          <Link href='datasets'>
            <img src='logo.svg' />
          </Link>
          <Grid
            container
            justify='center'
            alignItems='flex-end'
            spacing={5}
            style={{ height: '100%' }}
          >
            {/* <Grid item style={{ height: '48px' }}> */}
            <Link
              style={linkStyles}
              href='stores'
              color='textSecondary'
              variant='subtitle2'
              underline='none'
            >
              Stores
            </Link>
            {/* </Grid> */}
            {/* <Grid item style={{ height: '48px' }}> */}
            <Link
              style={linkStyles}
              href='kpi'
              color='textSecondary'
              variant='subtitle2'
              underline='none'
            >
              KPI
            </Link>
            {/* </Grid> */}
            {/* <Grid item style={{ height: '48px' }}> */}
            <Link
              style={linkStyles}
              href='isochrones'
              color='textSecondary'
              variant='subtitle2'
              underline='none'
            >
              Isochrones
            </Link>
            {/* </Grid> */}
            {/* <Grid item style={{ height: '48px' }}> */}
            <Link
              style={linkStyles}
              href='datasets'
              color='textSecondary'
              variant='subtitle2'
              underline='none'
            >
              Datasets
            </Link>
            {/* </Grid> */}
          </Grid>
          <IconButton color='inherit'>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid container style={{ flexGrow: 1 }}>
        <Grid item style={{ width: 350 }}>
          <Outlet />
        </Grid>
        <Grid item xs style={{ position: 'relative' }}>
          <Map />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;
