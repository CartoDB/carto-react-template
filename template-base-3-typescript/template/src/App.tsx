import { useRoutes } from 'react-router-dom';
import {
  CssBaseline,
  Grid,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core';
import LazyLoadRoute from 'components/common/LazyLoadRoute';
import theme from './theme';
import routes from './routes';
import useAuth from './hooks/Auth0';

const useStyles = makeStyles(() => ({
  app: {
    flex: '1 1 auto',
    overflow: 'hidden',
  },
}));

export default function App() {
  useAuth();

  return (
    <ThemeProvider theme={theme}>
      <ThemedApp />
    </ThemeProvider>
  );
}

function ThemedApp() {
  const classes = useStyles();
  const routing = useRoutes(routes);

  return (
    <>
      <CssBaseline />
      <Grid container direction='column' className={classes.app}>
        <LazyLoadRoute>{routing}</LazyLoadRoute>
      </Grid>
    </>
  );
}
