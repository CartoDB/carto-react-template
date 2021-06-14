import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Grid,
  Link,
  Hidden,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { logout } from '@carto/react-redux';

const useStyles = makeStyles((theme) => ({
  avatar: {
    cursor: 'pointer',
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    marginLeft: theme.spacing(1),
  },
}));

export default function UserMenu() {
  const oauthApp = useSelector((state) => state.oauth.oauthApp);
  const user = useSelector((state) => state.oauth.userInfo);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  // If no OAuthApp has been configured, no user-related controls are displayed
  // or User is NOT logged in, so display nothing
  if (!oauthApp || !user) {
    return null;
  }

  const handleMenu = (event) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  // Display User menu, with name, avatar + an attached menu for user-related options
  return (
    <>
      <Link
        aria-label='account of current user'
        aria-controls='menu-login'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <Grid container alignItems='center' item wrap='nowrap'>
          <Hidden smDown>
            <Typography variant='caption' color='inherit' noWrap>
              {user.username}
            </Typography>
          </Hidden>
          <Avatar className={classes.avatar} src={user.avatar_url} />
        </Grid>
      </Link>
      <Content anchorEl={anchorEl} setAnchorEl={setAnchorEl} user={user} />
    </>
  );
}

function Content({ anchorEl, setAnchorEl, user }) {
  const dispatch = useDispatch();

  // At this point, there is an oauthApp and the user has logged in (forceOAuthLogin mode).
  const open = Boolean(anchorEl);

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

  return (
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
  );
}
