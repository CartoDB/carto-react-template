import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { CssBaseline, Grid, makeStyles, ThemeProvider } from '@material-ui/core';
import routes from './routes';
import theme from 'theme';
import Header from 'components/common/Header';
import Login from 'components/views/login/Login';
import LazyLoadRoute from 'components/common/LazyLoadRoute';

const useStyles = makeStyles(() => ({
  app: {
    flex: '1 1 auto',
    overflow: 'hidden',
  },
}));

export default function App() {
  const routing = useRoutes(routes);
  const forceLogin = useSelector((state) => state.app.forceOAuthLogin);
  const user = useSelector((state) => state.oauth.userInfo);
  const classes = useStyles();

  const displayLogin = forceLogin && !user;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container direction='column' className={classes.app}>
        {displayLogin ? (
          <Login />
        ) : (
          <>
            <Header />
            <LazyLoadRoute>{routing}</LazyLoadRoute>
          </>
        )}
      </Grid>
    </ThemeProvider>
  );
}
