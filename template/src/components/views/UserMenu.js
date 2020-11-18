import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Link, Menu, MenuItem, Typography } from '@material-ui/core';
import { OAuthLogin } from 'lib/oauth';
import { logout } from 'lib/slice/oauthSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  avatar: {
    cursor: 'pointer',
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
  },
}));

function UserMenu() {
  const oauthApp = useSelector((state) => state.oauth.oauthApp);
  const user = useSelector((state) => state.oauth.userInfo);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  // If no OAuthApp has been configured, no user-related controls are displayed
  if (!oauthApp) {
    return null;
  }

  // User is NOT logged in, so display Login with CARTO
  if (!user) {
    return <OAuthLogin />;
  }

  // At this point, there is an oauthApp and the user has logged in.
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  const goToCarto = () => {
    const url = user.api_endpoints.builder;
    window.open(url, '_blank');
  };

  // Display User menu, with name, avatar + an attached menu for user-related options
  return (
    <div className={classes.root}>
      <Grid
        container
        justify='flex-end'
        alignItems='center'
        spacing={1}
        style={{ flexGrow: 1 }}
      >
        <Grid item>
          <Typography variant='caption' color='inherit'>
            {user.username}
          </Typography>
        </Grid>
        <Grid item>
          <Link
            edge='end'
            aria-label='account of current user'
            aria-controls='menu-login'
            aria-haspopup='true'
            onClick={handleMenu}
          >
            <Avatar className={classes.avatar} src={user.avatar_url}></Avatar>
          </Link>
          <Menu
            id='menu-login'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem onClick={goToCarto}>Go to CARTO</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserMenu;
