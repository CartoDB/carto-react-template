import { useState } from 'react';
import { Hidden, Grid, Link, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  cursor: 'pointer',
  width: theme.spacing(4.5),
  height: theme.spacing(4.5),
  marginLeft: theme.spacing(1),
}));

export default function UserMenu() {
  const { logout, user } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);

  // User is NOT logged in, so display nothing
  if (!user) {
    return null;
  }

  // At this point, there is an oauthApp and the user has logged in (forceOAuthLogin mode).
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    handleClose();
  };

  // Display User menu, with name, avatar + an attached menu for user-related options
  return (
    <>
      <Grid container alignItems='center' item wrap='nowrap'>
        <Hidden mdDown>
          <Typography variant='caption' color='inherit' noWrap>
            {user.email}
          </Typography>
        </Hidden>
        <Link
          edge='end'
          aria-label='account of current user'
          aria-controls='menu-login'
          aria-haspopup='true'
          onClick={handleMenu}
          color='inherit'
          underline='none'
        >
          <StyledAvatar src={user.picture} />
        </Link>
      </Grid>
      <Menu
        id='menu-login'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem>
          <Link href='https://app.carto.com' color='textPrimary' underline='none'>
            Go to CARTO
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}
