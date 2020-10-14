import React from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { Map } from 'components/common/map/Map';
import { addLayer, addDataSource } from 'config/cartoSlice';

function Stores() {
  const dispatch = useDispatch();

  dispatch(
    addDataSource({
      id: 'storesSource',
      data:
        'SELECT cartodb_id, zip, storetype, state, the_geom_webmercator FROM mcdonalds',
      credentials: {
        username: 'aasuero',
        apiKey: 'default_public',
        serverUrlTemplate: 'https://{user}.carto.com',
      },
    })
  );
  dispatch(addLayer({ id: 'storesLayer', source: 'storesSource' }));

  return (
    <Grid container direction='column' style={{ height: '100vh' }}>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>Stores</Toolbar>
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

export default Stores;
