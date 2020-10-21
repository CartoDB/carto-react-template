import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from './lib/react-ui';
import routes from './routes';

const theme = createTheme();

function App() {
  const routing = useRoutes(routes);
  return <ThemeProvider theme={theme}>{routing}</ThemeProvider>;
}

export default App;
