import React from 'react';
import { AppBar, Tab, Tabs, Toolbar, Grid, Link, makeStyles } from '@material-ui/core';
import UserMenu from 'components/views/UserMenu';
import { NavLink, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
}));

export function Header() {
  const classes = useStyles();
  const location = useLocation();

  return (
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
  );
}
