import { useRoutes } from 'react-router-dom';
import {
  // CssBaseline,
  Grid,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  useTheme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import LazyLoadRoute from 'components/common/LazyLoadRoute';
// import theme from './theme';
import routes from './routes';
import useAuth from './hooks/Auth0';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles(() => ({
  app: {
    flex: '1 1 auto',
    overflow: 'hidden',
  },
}));

export default function App() {
  useAuth();
  const theme = useTheme();

  return (
    <StyledEngineProvider injectFirst>
      {/* <ThemeProvider theme={theme}> */}
      <ThemeProvider theme={theme}>
        <ThemedApp />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

function ThemedApp() {
  const classes = useStyles();
  const routing = useRoutes(routes);

  return (
    <>
      {/* <CssBaseline /> */}
      <Grid container direction='column' className={classes.app}>
        <LazyLoadRoute>{routing}</LazyLoadRoute>
      </Grid>
    </>
  );
}
