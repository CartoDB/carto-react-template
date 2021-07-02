import { lazy } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ErrorSnackbar from 'components/common/ErrorSnackbar';
import LazyLoadComponent from 'components/common/LazyLoadComponent';
import { Grid } from '@material-ui/core';

const MapContainer = lazy(() =>
  import(/* webpackChunkName: 'map-container' */ 'components/views/main/MapContainer')
);
const Desktop = lazy(() =>
  import(/* webpackChunkName: 'main-desktop' */ 'components/views/main/Desktop')
);
const Mobile = lazy(() =>
  import(/* webpackChunkName: 'main-mobile' */ 'components/views/main/Mobile')
);

export const DRAWER_WIDTH = 350;

const useStyles = makeStyles((theme) => ({
  main: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  drawer: {
    flex: '0 0 auto',
    [theme.breakpoints.down('xs')]: {
      height: 95,
    },
    [theme.breakpoints.up('xs')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
}));

export default function Main() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
    <Grid container direction='row' alignItems='stretch' item xs className={classes.main}>
      <LazyLoadComponent>
        <nav className={classes.drawer}>
          <Desktop />
          <Mobile />
        </nav>
        <MapContainer />
        <ErrorSnackbar />
      </LazyLoadComponent>
    </Grid>
  );
}
