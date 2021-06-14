import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import {
  createMuiTheme,
  CssBaseline,
  Grid,
  makeStyles,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core';

import { useAuth0 } from '@auth0/auth0-react';
import { cartoThemeOptions } from '@carto/react-ui';
import { setCredentials } from '@carto/react-redux';
import routes from './routes';
import Header from 'components/common/Header';
import Login from 'components/views/login/Login';

let theme = createMuiTheme(cartoThemeOptions);
theme = responsiveFontSizes(theme, {
  breakpoints: cartoThemeOptions.breakpoints.keys,
  disableAlign: false,
  factor: 2,
  variants: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'button',
    'caption',
    'overline',
  ],
});

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.carto.credentials.accessToken);
  const routing = useRoutes(routes);
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const getAccessToken = async () => {
        let accessToken = await getAccessTokenSilently();
        dispatch(setCredentials({ accessToken }));
      };
      getAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated, dispatch]);

  const showLoading = isLoading || (isAuthenticated && !accessToken);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container direction='column' className={classes.root}>
        {showLoading && <p>Loading</p>}
        {!showLoading && !isAuthenticated && <Login />}
        {accessToken && (
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
