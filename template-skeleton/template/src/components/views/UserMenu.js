import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Grid,
  Hidden,
  Link,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';

import { OAuthLogin } from '@carto/react/oauth';
import { logout } from '@carto/react/redux';

const useStyles = makeStyles((theme) => ({
  avatar: {
    cursor: 'pointer',
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    marginLeft: theme.spacing(1),
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
    <React.Fragment>
      <Link
        edge='end'
        aria-label='account of current user'
        aria-controls='menu-login'
        aria-haspopup='true'
        onClick={handleMenu}
      >
        <Grid container alignItems='center' item wrap='nowrap'>
          <Hidden smDown>
            <Typography variant='caption' color='inherit' noWrap>
              {user.username}
            </Typography>
          </Hidden>
          <Avatar className={classes.avatar} src={user.avatar_url}></Avatar>
        </Grid>
      </Link>
      <Menu
        id='menu-login'
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
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
    </React.Fragment>
  );
}

export default UserMenu;
