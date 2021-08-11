import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { CssBaseline, Grid, makeStyles, ThemeProvider } from '@material-ui/core';
import LazyLoadRoute from 'components/common/LazyLoadRoute';
import LazyLoadComponent from 'components/common/LazyLoadComponent';
import theme from './theme';
import routes from './routes';

const ErrorSnackbar = lazy(
  () => import(/* webpackChunkName: 'error-snackbar' */ 'components/common/ErrorSnackbar')
);

const useStyles = makeStyles(() => ({
  app: {
    flex: 1,
    overflow: 'hidden',
  },
}));

export default function App() {
  const routing = useRoutes(routes);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Grid container direction='column' className={classes.app}>
        <LazyLoadRoute>{routing}</LazyLoadRoute>

        <LazyLoadComponent>
          <ErrorSnackbar />
        </LazyLoadComponent>
      </Grid>
    </ThemeProvider>
  );
}
