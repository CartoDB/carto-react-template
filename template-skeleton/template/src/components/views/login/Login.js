import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Button, CircularProgress, Grid, makeStyles, Link, Typography } from "@material-ui/core";

import { ReactComponent as CartoIcon } from "assets/img/icon-carto-symbol.svg";
import SvgIcon from "@material-ui/core/SvgIcon";

import { useOAuthLogin } from "@carto/react/oauth";
import { setTokenAndUserInfoAsync } from "@carto/react/redux";

import { setError } from "config/appSlice";

const useStyles = makeStyles((theme) => ({
  fullContainer: {
    backgroundColor: theme.palette.primary.main,
    height: '100%',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 28, 0),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 5, 0),
    }
  },
  content: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(12),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(7),
    }            
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
  login: {
    marginTop: theme.spacing(9),
  },
  contact: {
    marginTop: theme.spacing(2),
    color: theme.palette.common.white,
  },
  footer: {
    position: 'absolute',
    bottom: theme.spacing(3),
    color: theme.palette.common.white,
  }
}));

const cartoLoginIcon = (
  <SvgIcon>
    <CartoIcon />
  </SvgIcon>
);

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const oauthApp = useSelector((state) => state.oauth.oauthApp);

  const [loading, setLoading] = useState(false);

  const onParamsRefreshed = (oauthParams) => {
    if (oauthParams.error) {
      dispatch(setError(`OAuth error: ${oauthParams.error}`));
    } else {
      dispatch(setTokenAndUserInfoAsync(oauthParams));
    }
    setLoading(false);
  };

  const [handleLogin] = useOAuthLogin(oauthApp, onParamsRefreshed);

  const logInWithCarto = () => {
    setLoading(true);
    handleLogin();
  }

  return (
    <Grid container
      className={classes.fullContainer}
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item>
        <img src="/logo-negative.svg" alt="CARTO" />
      </Grid>

      <Grid item container direction="column" className={classes.content}>
        <Grid item className={classes.subtitle}>
          <Typography variant='subtitle1' color='inherit'>CARTO APPS</Typography>
        </Grid>

        <Grid item className={classes.title}>
          <Typography variant='h3' color='inherit'>React Demo</Typography>
        </Grid>

        <Grid item className={classes.description}>
          <Typography variant='h5' color='inherit'>Discover the power of developing with CARTO for React library</Typography>
        </Grid>

        <Grid item className={classes.login}>
          <Button variant="contained" color="secondary" size='large'
            onClick={logInWithCarto}
            startIcon={
              loading ? <CircularProgress size={24} /> : cartoLoginIcon
            }>
            Login with CARTO
          </Button>
        </Grid>

        <Grid item className={classes.contact}>
          <Typography variant='caption' color='inherit'>Don't have an account yet? </Typography>
          <Link variant='caption' href="https://carto.com" target="_blank" color='inherit'>Contact</Link>
        </Grid>

      </Grid>

      <Grid item className={classes.footer}>
        <Typography variant='caption' color='inherit'>&copy; CARTO 2020</Typography>
      </Grid>

    </Grid>
  );
}
