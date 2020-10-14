import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import routes from './routes';
import { theme } from 'lib/ui/carto-theme';

function App() {
  const routing = useRoutes(routes);
  return <ThemeProvider theme={theme}>{routing}</ThemeProvider>;
}

export default App;
