import { useRoutes } from 'react-router-dom';
import { CssBaseline, Grid, makeStyles, ThemeProvider } from '@material-ui/core';
import routes from './routes';
import theme from 'theme';
import LazyLoadRoute from 'components/common/LazyLoadRoute';

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
        <LazyLoadRoute>{routing}</LazyLoadRoute>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
