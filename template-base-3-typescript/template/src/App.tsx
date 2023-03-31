import { useRoutes } from 'react-router-dom';
import {
  CssBaseline,
  Grid,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import LazyLoadRoute from 'components/common/LazyLoadRoute';
import { theme } from '@carto/react-ui';
import routes from './routes';
import useAuth from './hooks/Auth0';

const useStyles = makeStyles(() => ({
  app: {
    flex: '1 1 auto',
    overflow: 'hidden',
  },
}));

export default function App() {
  const routing = useRoutes(routes);
  const classes = useStyles();
  useAuth();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container direction='column' className={classes.app}>
          <LazyLoadRoute>{routing}</LazyLoadRoute>
        </Grid>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
