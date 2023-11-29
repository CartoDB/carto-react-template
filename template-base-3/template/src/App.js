import { useRoutes } from 'react-router-dom';
import { CssBaseline, Grid, ThemeProvider, StyledEngineProvider } from '@mui/material';
import { styled } from '@mui/material/styles';
import LazyLoadRoute from 'components/common/LazyLoadRoute';
import theme from './theme';
import routes from './routes';
import useAuth from './hooks/Auth0';
import { IntlProvider } from 'react-intl';

const GridApp = styled(Grid)(() => ({
  flex: '1 1 auto',
  flexDirection: 'column',
  overflow: 'hidden',
}));

export default function App() {
  const routing = useRoutes(routes);
  useAuth();

  return (
    <IntlProvider locale='en'>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GridApp container>
            <LazyLoadRoute>{routing}</LazyLoadRoute>
          </GridApp>
        </ThemeProvider>
      </StyledEngineProvider>
    </IntlProvider>
  );
}
