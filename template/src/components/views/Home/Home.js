import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Grid,
  Typography,
  IconButton,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Map } from 'components/common/map/Map';

function Home() {
  return (
    <Grid container direction='column' style={{ height: '100vh' }}>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>CARTO</Typography>
          <Grid container justify='center' spacing={3} style={{ flexGrow: 1 }}>
            <Grid item>
              <Link to='stores'>Stores</Link>
            </Grid>
            <Grid item>
              <Link to='kpi'>KPI</Link>
            </Grid>
            <Grid item>
              <Link to='isochrones'>Isochrones</Link>
            </Grid>
            <Grid item>
              <Link to='datasets'>Datasets</Link>
            </Grid>
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
