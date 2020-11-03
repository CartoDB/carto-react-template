import React, { useEffect } from 'react';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@carto/react-airship-ui';
import routes from './routes';

const theme = createTheme();

function App() {
  const routing = useRoutes(routes);
  const navigate = useNavigate();
  const currentLocation = useLocation();

  useEffect(() => {
    if (currentLocation.pathname === '/') {
      navigate('/stores');
    }
  }, [navigate, currentLocation]);

  return <ThemeProvider theme={theme}>{routing}</ThemeProvider>;
}

export default App;
