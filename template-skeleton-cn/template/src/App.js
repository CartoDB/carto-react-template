import { useRoutes } from 'react-router-dom';
import { CssBaseline, Grid, makeStyles, ThemeProvider } from '@material-ui/core';
import LazyLoadRoute from 'components/common/LazyLoadRoute';
import theme from './theme';
import routes from './routes';
// import Header from 'components/common/Header';
// import { initialState } from 'store/initialStateSlice';
// import Auth0 from './Auth0';

const useStyles = makeStyles(() => ({
  app: {
    flex: '1 1 auto',
    overflow: 'hidden',
  },
}));

export default function App() {
  const routing = useRoutes(routes);
  const classes = useStyles();

  // let children = (
  //   <>
  //     <Header />
  //     {routing}
  //   </>
  // );

  // if (initialState.oauth) {
  //   children = Auth0({ children });
  // }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container direction='column' className={classes.app}>
        <LazyLoadRoute>{routing}</LazyLoadRoute>
      </Grid>
    </ThemeProvider>
  );
}
