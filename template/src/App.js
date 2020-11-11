import React from 'react';
import { useRoutes } from 'react-router-dom';
import { CssBaseline, Grid, makeStyles, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@carto/react-airship-ui';
import routes from './routes';
import { Header } from 'components/common/Header';

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    width: '100vw',
    height: '100vh',
  },
}));

function App() {
  const classes = useStyles();
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container direction='column' className={classes.root}>
        <Header></Header>
        {routing}
      </Grid>
    </ThemeProvider>
  );
}

export default App;
