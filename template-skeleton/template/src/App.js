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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container direction='column' className={classes.root}>
        {routing}
      </Grid>
    </ThemeProvider>
  );
}

export default App;
