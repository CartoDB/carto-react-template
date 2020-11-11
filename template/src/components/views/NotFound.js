import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import background404 from 'assets/img/404.svg';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  containerWrapper: {
    height: 'calc(100% - 56px)',
  },
  contentWrapper: {
    height: '100%',
    backgroundImage: `url("${background404}")`,
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  },
  actionWrapper: {
    marginTop: '24px',
  },
}));

export default function NotFound() {
  const classes = useStyles();

  return (
    <Grid container direction='column' className={classes.grid}>
      <CssBaseline />
      <AppBar position='static' className={classes.navBar}>
        <Toolbar>
          <Link component={NavLink} to='/' className={classes.logo}>
            <img src='/logo.svg' alt='CARTO logo' />
          </Link>
          <Grid container justify='center' className={classes.navTabs}>
            <Tabs>
              <Tab
                label='Stores'
                value='stores'
                component={NavLink}
                to='/stores'
                className={classes.navLink}
              />
              <Tab
                label='KPI'
                value='kpi'
                component={NavLink}
                to='/kpi'
                className={classes.navLink}
              />
              <Tab
                label='Datasets'
                value='datasets'
                component={NavLink}
                to='/datasets'
                className={classes.navLink}
              />
            </Tabs>
          </Grid>
          <Grid container item xs={3}>
            <UserMenu />
          </Grid>
        </Toolbar>
      </AppBar>
      <Container className={classes.containerWrapper}>
        <Grid
          container
          item
          direction='column'
          spacing={2}
          justify='center'
          className={classes.contentWrapper}
        >
          <Grid item>
            <Typography variant='h5'>Error 404</Typography>
          </Grid>
          <Grid item>
            <Typography variant='h3'>
              Whoops!
              <br />
              You’re lost at sea
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>
              The map you’re looking for doesn’t exist.
              <br />
              Use Location Intelligence to find your way home.
            </Typography>
          </Grid>
          <Grid item className={classes.actionWrapper}>
            <Link to='/' component={NavLink} underline='none'>
              <Button variant='contained' color='primary' size='large'>
                Take me home
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
