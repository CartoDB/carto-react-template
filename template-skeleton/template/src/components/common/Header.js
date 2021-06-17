import { useEffect, useState } from 'react';
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
import cartoLogo from 'assets/img/carto-logo.svg';
import { ReactComponent as CartoLogoXS } from 'assets/img/carto-logo-xs.svg';

const useStylesCommon = makeStyles((theme) => ({
  title: {
    '& h1': {
      display: 'flex',
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.common.white,

      '& strong': {
        marginRight: theme.spacing(0.5),
      },

      '& svg': {
        height: `${theme.typography.subtitle1.lineHeight}em`,
        marginRight: theme.spacing(1.5),
        width: 'auto',
        verticalAlign: 'bottom',
      },
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  header: {
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

export default function Header() {
  // const location = useLocation();
  // const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();

  // useEffect(() => {
  //   setDrawerOpen(false);
  // }, [location]);

  // const handleDrawerToggle = () => {
  //   setDrawerOpen(!drawerOpen);
  // };

  return (
    <AppBar position='static' className={classes.header}>
      <Toolbar variant='dense'>
        <Mobile />
        {/* <Hidden smUp>
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
        </Hidden> */}
        {/* <Link component={NavLink} to='/' className={classes.title}>
          <Typography component='h1' variant='subtitle1' noWrap>
            <Hidden xsDown>
              <img src={cartoLogo} alt='CARTO ' />
            </Hidden>
            <Hidden smUp>
              <img src={cartoLogoXs} alt='CARTO ' />
            </Hidden>
            <strong>React</strong> Demo
          </Typography>
        </Link> */}
        {/* <Hidden xsDown>
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
        </Grid> */}
      </Toolbar>
    </AppBar>
  );
}

const useStylesMobile = makeStyles((theme) => ({
  menuButton: {
    margin: theme.spacing(0, 0.75, 0, -1.25),

    '& + hr': {
      marginRight: theme.spacing(1.5),
    },
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

  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Hidden smUp>
      <IconButton
        className={classes.menuButton}
        color='inherit'
        aria-label='menu'
        onClick={handleDrawerToggle}
      >
        {drawerOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Divider orientation='vertical' light />
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
          <NavigationMenu column={true} />
        </Grid>
      </Drawer>
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

function NavigationMenu({ column: vertical }) {
  const location = useLocation();
  const classes = useStylesNavigationMenu();

  const pathname = location.pathname.split('/')[1] || '';

  return (
    <Grid
      container
      direction={vertical ? 'column' : 'row'}
      className={!vertical ? classes.navTabs : ''}
    >
      <Tabs
        value={pathname}
        textColor={vertical ? 'primary' : 'inherit'}
        orientation={vertical ? 'vertical' : 'horizontal'}
        variant={vertical ? 'fullWidth' : 'standard'}
      >
        <Tab label='Home' value='' component={NavLink} to='/' />
        {/* [hygen] Import links */}
      </Tabs>
    </Grid>
  );
}
