import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Drawer,
  Divider,
  Hidden,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import UserMenu from 'components/views/login/UserMenu';
import { NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as CartoLogo } from 'assets/img/carto-logo.svg';
import { ReactComponent as CartoLogoXS } from 'assets/img/carto-logo-xs.svg';

const useStylesCommon = makeStyles((theme) => ({
  title: {
    '& h1': {
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.appBar?.contrastText || theme.palette.primary?.contrastText,

      '& svg': {
        height: `${theme.typography.subtitle1.lineHeight}em`,
        marginRight: theme.spacing(2),
        width: 'auto',
        verticalAlign: 'bottom',
      },
    },
  },
}));

const useStyles = makeStyles((theme) => {
  return {
    navBar: {
      zIndex: theme.zIndex.modal + 1,
      overflow: 'hidden',
      backgroundColor: theme.palette.appBar?.main || theme.palette.primary.main,
    },
    navLink: {
      color: theme.palette.appBar?.contrastText || theme.palette.primary?.contrastText,
    },
  };
});

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position='static' className={classes.navBar}>
      <Toolbar variant='dense'>
        <Desktop />
        <Mobile />
      </Toolbar>
    </AppBar>
  );
}

const useStylesDesktop = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(0, 3),
  },
}));

function Desktop() {
  const location = useLocation();
  const classes = {
    ...useStylesCommon(),
    ...useStylesDesktop(),
  };

  const pathname = location.pathname.split('/')[1];

  return (
    <Hidden xsDown>
      <Link component={NavLink} to='/' className={classes.title}>
        <Typography component='h1' variant='subtitle1' noWrap>
          <CartoLogo />
          <AppName />
        </Typography>
      </Link>
      <Divider orientation='vertical' className={classes.divider} light></Divider>
      <NavigationMenu pathname={pathname} />
      <Grid container item xs justify='flex-end'>
        <UserMenu />
      </Grid>
    </Hidden>
  );
}

const useStylesMobile = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    minWidth: 260,
  },
}));

function Mobile() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = {
    ...useStylesCommon(),
    ...useStylesMobile(),
  };

  const pathname = location.pathname.split('/')[1];

  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
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
      <Link component={NavLink} to='/' className={classes.title}>
        <Typography component='h1' variant='subtitle1' noWrap>
          <Hidden smUp>
            <CartoLogoXS />
            <Divider orientation='vertical' light />
          </Hidden>
          <AppName />
        </Typography>
      </Link>
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
          <NavigationMenu pathname={pathname} vertical />
        </Grid>
      </Drawer>
      <Grid container item xs justify='flex-end'>
        <UserMenu />
      </Grid>
    </Hidden>
  );
}

function AppName() {
  return (
    <>
      <strong>React</strong> Demo
    </>
  );
}

const useStylesNavigationMenu = makeStyles((theme) => ({
  navTabs: {
    '& .MuiTabs-indicator': {
      backgroundColor:
        theme.palette.appBar?.contrastText || theme.palette.primary?.contrastText,
    },
  },
}));

function NavigationMenu({ pathname, vertical }) {
  const classes = useStylesNavigationMenu();

  return (
    <Grid
      container
      direction={vertical ? 'column' : 'row'}
      className={!vertical ? classes.navTabs : ''}
    >
      <Tabs
        value={pathname}
        textColor='inherit'
        orientation={vertical ? 'vertical' : 'horizontal'}
        variant={vertical ? 'fullWidth' : 'standard'}
      >
        <Tab label='Home' value='' component={NavLink} to='/' />
        {/* [hygen] Import links */}
      </Tabs>
    </Grid>
  );
}
