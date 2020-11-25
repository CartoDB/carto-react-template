import React, { useState } from 'react';
import {
  AppBar,
  Drawer,
  Hidden,
  Grid,
  IconButton,
  Link,
  makeStyles,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  Divider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import UserMenu from 'components/views/UserMenu';
import { NavLink, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  navBar: {
    boxShadow: 'none',
    zIndex: theme.zIndex.modal + 1,
    overflow: 'hidden',
  },
  navTabs: {
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.common.white,
    },
  },
  divider: {
    margin: theme.spacing(0, 3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    minWidth: 260,
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

const NavigationMenu = (props) => {
  const { column: vertical } = props;
  const classes = useStyles();
  const location = useLocation();

  return (
    <React.Fragment>
      <Grid
        container
        direction={vertical ? 'column' : 'row'}
        className={!vertical ? classes.navTabs : ''}
      >
        <Tabs
          value={location.pathname.split('/')[1] || 'stores'}
          textColor='inherit'
          orientation={vertical ? 'vertical' : 'horizontal'}
          variant={vertical ? 'fullWidth' : 'standard'}
        >
          <Tab label='Stores' value='stores' component={NavLink} to='/stores' />
          <Tab label='KPI' value='kpi' component={NavLink} to='/kpi' />
          <Tab label='Datasets' value='datasets' component={NavLink} to='/datasets' />
          {/* Auto import links */}
        </Tabs>
      </Grid>
      <Grid
        container
        item
        xs={vertical ? false : 3}
        justify={vertical ? 'center' : 'flex-end'}
      >
        <UserMenu />
      </Grid>
    </React.Fragment>
  );
};

export function Header() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position='static' className={classes.navBar}>
      <Toolbar variant='dense'>
        <Hidden smUp>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Link component={NavLink} to='/' className={classes.title}>
          <Typography component='h1' variant='subtitle1' noWrap>
            <img src='/logo.svg' alt='CARTO ' />
            <strong>React</strong> Demo
          </Typography>
        </Link>
        <Hidden xsDown>
          <Divider orientation='vertical' className={classes.divider} light></Divider>
          <NavigationMenu />
        </Hidden>
        <Hidden smUp>
          <Drawer
            variant='temporary'
            anchor='left'
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            PaperProps={{
              className: classes.drawer,
            }}
          >
            <Toolbar variant='dense' />
            <Grid container direction='column' justify='space-between' item xs>
              <NavigationMenu column={true} />
            </Grid>
          </Drawer>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
