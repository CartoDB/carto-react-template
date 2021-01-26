import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Drawer,
  Divider,
  Hidden,
  Grid,
  IconButton,
  Link,
  makeStyles,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import UserMenu from 'components/views/login/UserMenu';
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
    margin: theme.spacing(0, 0.75, 0, -1.25),

    '& + hr': {
      marginRight: theme.spacing(1.5),
    },
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
        marginRight: theme.spacing(1.5),
        verticalAlign: 'bottom',
      },
    },
  },
}));

const NavigationMenu = (props) => {
  const { location, column: vertical } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid
        container
        direction={vertical ? 'column' : 'row'}
        className={!vertical ? classes.navTabs : ''}
      >
        <Tabs
          value={location.pathname.split('/')[1] || 'stores'}
          textColor={vertical ? 'primary' : 'inherit'}
          orientation={vertical ? 'vertical' : 'horizontal'}
          variant={vertical ? 'fullWidth' : 'standard'}
        >
          <Tab label='Stores' value='stores' component={NavLink} to='/stores' />
          <Tab label='KPI' value='kpi' component={NavLink} to='/kpi' />
          <Tab label='Datasets' value='datasets' component={NavLink} to='/datasets' />
          {/* Auto import links */}
        </Tabs>
      </Grid>
    </React.Fragment>
  );
};

export function Header() {
  const classes = useStyles();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

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
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Divider orientation='vertical' light />
        </Hidden>
        <Link component={NavLink} to='/' className={classes.title}>
          <Typography component='h1' variant='subtitle1' noWrap>
            <Hidden xsDown>
              <img src='/logo.svg' alt='CARTO ' />
            </Hidden>
            <Hidden smUp>
              <img src='/logo-xs.svg' alt='CARTO ' />
            </Hidden>
            <strong>React</strong> Demo
          </Typography>
        </Link>
        <Hidden xsDown>
          <Divider orientation='vertical' className={classes.divider} light />
          <NavigationMenu location={location} />
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
              <NavigationMenu location={location} column={true} />
            </Grid>
          </Drawer>
        </Hidden>
        <Grid container item xs justify='flex-end'>
          <UserMenu />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
