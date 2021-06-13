import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import {
  createMuiTheme,
  CssBaseline,
  Grid,
  makeStyles,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core';
import { cartoThemeOptions } from '@carto/react-ui';
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
  app: {
    flex: 1,
    overflow: 'hidden',
  },
}));

export default function App() {
  const forceLogin = useSelector((state) => state.app.forceOAuthLogin);
  const user = useSelector((state) => state.oauth.userInfo);
  const classes = useStyles();
  const routing = useRoutes(routes);

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
            {routing}
          </>
        )}
      </Grid>
    </ThemeProvider>
  );
}
