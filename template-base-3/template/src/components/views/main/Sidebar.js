import { Outlet } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Drawer, SwipeableDrawer, Fab, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { setBottomSheetOpen } from 'store/appSlice';
import LazyLoadRoute from 'components/common/LazyLoadRoute';
import { useTheme } from '@mui/styles';

export const DRAWER_WIDTH = 350;

const useStyles = makeStyles((theme) => ({
  drawer: {
    flex: '0 0 auto',
    [theme.breakpoints.down('md')]: {
      height: 95,
    },
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <nav className={classes.drawer}>
      <LazyLoadRoute>
        {!isMobile && <Desktop />}
        {isMobile && <Mobile />}
      </LazyLoadRoute>
    </nav>
  );
}

const useStylesDesktop = makeStyles(() => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
    position: 'absolute',
  },
}));

function Desktop() {
  const classes = useStylesDesktop();

  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      variant='permanent'
      anchor='left'
      open
    >
      <Grid container item xs>
        <Outlet />
      </Grid>
    </Drawer>
  );
}

const useStyleMobile = makeStyles((theme) => ({
  closed: {},
  bottomSheet: {
    maxHeight: `calc(100% - ${theme.spacing(6)})`,

    '&$closed': {
      transform: `translateY(calc(100% - ${theme.spacing(12)})) !important`,
      visibility: 'visible !important',

      '& $bottomSheetContent': {
        overflow: 'hidden',
      },
    },
  },
  bottomSheetContent: {
    minHeight: theme.spacing(18),
    '& > *': {
      paddingBottom: theme.spacing(6),
    },
  },
  bottomSheetButton: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(2),
    zIndex: theme.zIndex.drawer,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
    transform: `translateY(${theme.spacing(3)})`,
    transition: `transform ${theme.transitions.easing.sharp} ${theme.transitions.duration.shortest}ms`,

    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },

    '& .MuiFab-label': {
      width: theme.spacing(9),
      justifyContent: 'flex-start',
    },

    '&$buttonShow': {
      transform: 'translateY(0)',

      '& $bottomSheetIcon': {
        transform: 'rotate(0)',
      },
    },
  },
  bottomSheetIcon: {
    color: theme.palette.text.hint,
    height: theme.spacing(4),
    transform: 'rotate(180deg)',
  },
  buttonShow: {},
}));

function Mobile() {
  const dispatch = useDispatch();
  const bottomSheetOpen = useSelector((state) => state.app.bottomSheetOpen);
  const classes = useStyleMobile();

  const handleWidgetsDrawerToggle = () => {
    dispatch(setBottomSheetOpen(!bottomSheetOpen));
  };

  return (
    <>
      <SwipeableDrawer
        variant='persistent'
        anchor='bottom'
        open={bottomSheetOpen}
        onOpen={handleWidgetsDrawerToggle}
        onClose={handleWidgetsDrawerToggle}
        PaperProps={{
          className: `${classes.bottomSheet} ${!bottomSheetOpen ? classes.closed : ''}`,
          elevation: 8,
        }}
      >
        <div className={classes.bottomSheetContent}>
          <Outlet />
        </div>
      </SwipeableDrawer>
      <Fab
        variant='extended'
        size='small'
        color='inherit'
        aria-label={bottomSheetOpen ? 'Hide' : 'Show'}
        className={`${classes.bottomSheetButton} ${
          !bottomSheetOpen ? classes.buttonShow : ''
        }`}
        onClick={handleWidgetsDrawerToggle}
      >
        <ExpandLessIcon className={classes.bottomSheetIcon} />
        {bottomSheetOpen ? 'Hide' : 'Show'}
      </Fab>
    </>
  );
}
