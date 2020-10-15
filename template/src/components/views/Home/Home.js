import React from 'react';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { Map } from 'components/common/map/Map';

function Home() {
  return (
    <Grid container direction='column' style={{ height: '100vh' }}>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>Carto</Toolbar>
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
