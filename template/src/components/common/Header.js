import React from 'react';
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  Grid,
  Link,
  makeStyles,
  Typography,
  Divider,
} from '@material-ui/core';
import UserMenu from 'components/views/UserMenu';
import { NavLink, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  navBar: {
    boxShadow: 'none',
  },
  divider: {
    margin: theme.spacing(0, 3),
  },
  title: {
    '& h1': {
      display: 'flex',
      color: theme.palette.common.white,
      '& img': {
        height: '24px',
        marginRight: theme.spacing(2),
      },
      '& span': {
        marginLeft: theme.spacing(0.5),
        fontWeight: 'normal',
      },
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
        <Link component={NavLink} to='/' className={classes.title}>
          <Typography component='h1' variant='subtitle1' display='inline'>
            <img src='/logo.svg' alt='CARTO logo' /> React
            <Typography variant='subtitle1' color='inherit' component='span'>
              Demo
            </Typography>
          </Typography>
        </Link>
        <Divider orientation='vertical' className={classes.divider} light></Divider>
        <Grid container className={classes.navTabs}>
          <Tabs value={location.pathname.split('/')[1]} textColor='inherit'>
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
            {/* Auto import links */}
          </Tabs>
        </Grid>
        <Grid container item xs={3}>
          <UserMenu />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
