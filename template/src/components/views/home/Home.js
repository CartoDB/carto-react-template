import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Grid,
  Link,
  IconButton,
  Avatar,
} from '@material-ui/core';
// import Avatar from '@material-ui/icons/AccountCircle';
import { Map } from 'components/common/map/Map';

const useStyles = makeStyles((theme) => ({
  navBar: {
    backgroundColor: theme.palette.primary.dark,
  },
  logo: {
    width: 'auto',
    height: '36px',
    '& img': {
      width: 'auto',
      height: '100%',
    },
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: '0 24px',
    borderBottom: `2px solid transparent`,
    color: theme.palette.text.secondary,
    opacity: '0.75',
    transition: 'opacity 0.25s ease, border 0.25s ease',
    '&.active, &:hover': {
      opacity: '1',
      borderBottom: `2px solid ${theme.palette.common.white}`,
    },
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <Grid container direction='column' style={{ height: '100vh' }}>
      <CssBaseline />
      <AppBar position='static' className={classes.navBar}>
        <Toolbar>
          <Link href='datasets' className={classes.logo}>
            <img src='logo.svg' alt='CARTO logo' />
          </Link>
          <Grid
            container
            justify='center'
            alignItems='flex-end'
            style={{ height: '100%' }}
          >
            <Link
              component={NavLink}
              to='stores'
              underline='none'
              variant='button'
              className={classes.navLink}
            >
              Stores
            </Link>
            <Link
              component={NavLink}
              to='kpi'
              underline='none'
              variant='button'
              className={classes.navLink}
            >
              KPI
            </Link>
            <Link
              component={NavLink}
              to='isochrones'
              underline='none'
              variant='button'
              className={classes.navLink}
            >
              Isochrones
            </Link>
            <Link
              component={NavLink}
              to='datasets'
              underline='none'
              variant='button'
              className={classes.navLink}
            >
              Datasets
            </Link>
          </Grid>
          <IconButton color='inherit'>
            <Avatar>A</Avatar>
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
