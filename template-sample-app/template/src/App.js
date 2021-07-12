import { useRoutes } from 'react-router-dom';
import { CssBaseline, Grid, makeStyles, ThemeProvider } from '@material-ui/core';
import routes from './routes';
import theme from 'theme';
import LazyLoadRoute from 'components/common/LazyLoadRoute';

const useStyles = makeStyles(() => ({
  app: {
    flex: '1 1 auto',
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
      </Grid>
    </ThemeProvider>
  );
}
