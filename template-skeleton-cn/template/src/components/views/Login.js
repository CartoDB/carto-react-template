import { useState } from 'react';
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Link,
  Typography,
} from '@material-ui/core';
import { ReactComponent as CartoIcon } from 'assets/img/icon-carto-symbol.svg';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as CartoLogoNegative } from 'assets/img/carto-logo-negative.svg';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';

const useStyles = makeStyles((theme) => ({
  login: {
    backgroundColor: theme.palette.primary.main,
    height: '100%',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 28, 0),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 5, 0),
    },
  },
  footer: {
    position: 'absolute',
    bottom: theme.spacing(3),
    color: theme.palette.common.white,
  },
}));

export default function Login() {
  const accessToken = useSelector((state) => state.carto.credentials.accessToken);
  const classes = useStyles();

  if (accessToken) {
    return <Navigate to={ROUTE_PATHS.DEFAULT} />;
  }

  return (
    <Grid
      container
      className={classes.login}
      direction='column'
      justifyContent='flex-start'
      alignItems='flex-start'
    >
      <Grid item>
        <CartoLogoNegative />
      </Grid>

      <Content />

      <Grid item className={classes.footer}>
        <Typography variant='caption' color='inherit'>
          &copy; CARTO 2021
        </Typography>
      </Grid>
    </Grid>
  );
}

const useStylesContent = makeStyles((theme) => ({
  content: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(12),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(7),
    },
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  title: {
    marginTop: theme.spacing(1),
    color: theme.palette.common.white,
  },
  description: {
    marginTop: theme.spacing(2),
    maxWidth: 485,
    color: theme.palette.common.white,
  },
  contact: {
    marginTop: theme.spacing(2),
    color: theme.palette.common.white,
  },
}));

function Content() {
  const classes = useStylesContent();

  return (
    <Grid item container direction='column' className={classes.content}>
      <Grid item className={classes.subtitle}>
        <Typography variant='subtitle1' color='inherit'>
          CARTO APPS
        </Typography>
      </Grid>

      <Grid item className={classes.title}>
        <Typography variant='h3' color='inherit'>
          React Demo
        </Typography>
      </Grid>

      <Grid item className={classes.description}>
        <Typography variant='h5' color='inherit'>
          Discover the power of developing with CARTO for React library
        </Typography>
      </Grid>

      <LoginButton />

      <Grid item className={classes.contact}>
        <Typography variant='caption' color='inherit'>
          Don't have an account yet?{' '}
        </Typography>
        <Link variant='caption' href='https://carto.com' target='_blank' color='inherit'>
          Contact
        </Link>
      </Grid>
    </Grid>
  );
}

const useStylesLoginButton = makeStyles((theme) => ({
  loginButton: {
    marginTop: theme.spacing(9),
  },
}));

function LoginButton() {
  const [loading, setLoading] = useState(false);
  const { loginWithRedirect } = useAuth0();
  const classes = useStylesLoginButton();

  const logInWithCarto = () => {
    setLoading(true);
    loginWithRedirect();
  };

  return (
    <Grid item className={classes.loginButton}>
      <Button
        variant='contained'
        color='secondary'
        size='large'
        onClick={logInWithCarto}
        startIcon={
          loading ? (
            <CircularProgress size={24} />
          ) : (
            <SvgIcon component={CartoIcon}></SvgIcon>
          )
        }
      >
        Login with CARTO
      </Button>
    </Grid>
  );
}
