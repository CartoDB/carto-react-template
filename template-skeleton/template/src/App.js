import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { CssBaseline, Grid, makeStyles, ThemeProvider } from '@material-ui/core';
import routes from './routes';
import theme from 'theme';
import Header from 'components/common/Header';
import Login from 'components/views/login/Login';

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
}));

function App() {
  const classes = useStyles();
  const forceLogin = useSelector((state) => state.app.forceOAuthLogin);
  const user = useSelector((state) => state.oauth.userInfo);

  const displayLogin = forceLogin && !user;

  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container direction='column' className={classes.root}>
        {displayLogin ? (
          <Login />
        ) : (
          <>
            <Header />
            {routing}
          </>
        )}
      </Grid>
    </ThemeProvider>
  );
}

export default App;
