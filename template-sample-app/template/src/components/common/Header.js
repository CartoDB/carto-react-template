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
  Avatar,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as CartoLogo } from 'assets/img/carto-logo.svg';
import { ReactComponent as CartoLogoXS } from 'assets/img/carto-logo-xs.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@carto/react-redux';
import { ROUTE_PATHS } from 'routes';

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
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position='static' className={classes.header}>
      <Toolbar variant='dense'>
        <Mobile />
        <Desktop />
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
      <Link component={NavLink} to={ROUTE_PATHS.DEFAULT} className={classes.title}>
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
      <Link component={NavLink} to={ROUTE_PATHS.DEFAULT} className={classes.title}>
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
        <Tab label='Stores' value='stores' component={NavLink} to={ROUTE_PATHS.STORES} />
        <Tab label='KPI' value='kpi' component={NavLink} to={ROUTE_PATHS.KPI} />
        <Tab
          label='Tileset'
          value='tileset'
          component={NavLink}
          to={ROUTE_PATHS.TILESET}
        />
        {/* [hygen] Import links */}
      </Tabs>
    </Grid>
  );
}

const useStylesUserMenu = makeStyles((theme) => ({
  avatar: {
    cursor: 'pointer',
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    marginLeft: theme.spacing(1),
  },
}));

function UserMenu() {
  const dispatch = useDispatch();
  const oauthApp = useSelector((state) => state.oauth.oauthApp);
  const user = useSelector((state) => state.oauth.userInfo);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStylesUserMenu();

  // User is NOT logged in, so display nothing
  if (!oauthApp || !user) {
    return null;
  }

  // At this point, there is an oauthApp and the user has logged in (forceOAuthLogin mode).
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  // Display User menu, with name, avatar + an attached menu for user-related options
  return (
    <>
      <Link
        edge='end'
        aria-label='account of current user'
        aria-controls='menu-login'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <Grid container alignItems='center' item wrap='nowrap'>
          <Hidden smDown>
            <Typography variant='caption' color='inherit' noWrap>
              {user.username}
            </Typography>
          </Hidden>
          <Avatar className={classes.avatar} src={user.avatar_url} />
        </Grid>
      </Link>
      <Menu
        id='menu-login'
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem>
          <Link href='https://app.carto.com'>Go to CARTO</Link>
        </MenuItem>
      </Menu>
    </>
  );
}
