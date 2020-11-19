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
  navTabs: {
    '& .MuiTabs-indicator': {
      backgrounColor: theme.palette.common.white,
    },
  },
  divider: {
    margin: theme.spacing(0, 3),
  },
  title: {
    '& h1': {
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.common.white,

      '& img': {
        height: `${theme.typography.subtitle1.lineHeight}em`,
        marginRight: theme.spacing(2),
        verticalAlign: 'bottom',
      },
    },
  },
}));

export function Header() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <AppBar position='static' className={classes.navBar}>
      <Toolbar variant='dense'>
        <Link component={NavLink} to='/' className={classes.title}>
          <Typography component='h1' variant='subtitle1' noWrap>
            <img src='/logo.svg' alt='CARTO ' />
            <strong>React</strong> Demo
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
