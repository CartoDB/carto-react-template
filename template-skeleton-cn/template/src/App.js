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
import { initialState } from 'store/initialStateSlice';
import Auth0 from './Auth0';

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
  const routing = useRoutes(routes);

  let children = (
    <>
      <Header />
      {routing}
    </>
  );

  if (initialState.oauth) {
    children = Auth0({ children });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container direction='column' className={classes.root}>
        {children}
      </Grid>
    </ThemeProvider>
  );
}

export default App;
