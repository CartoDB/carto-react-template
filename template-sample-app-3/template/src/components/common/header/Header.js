import { useEffect, useState } from 'react';
import { Divider, Hidden, Grid } from '@mui/material';
import { AppBar } from '@carto/react-ui';
import DrawerMenu from './DrawerMenu';
import NavigationMenu from './NavigationMenu';
import Logo from './Logo';
import UserMenu from './UserMenu';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 1,
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

export default function Header() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <StyledAppBar
      component='header'
      position='relative'
      showBurgerMenu
      onClickMenu={handleDrawerToggle}
      brandLogo={<Logo />}
      brandText='React Demo'
    >
      <Hidden mdUp>
        <DrawerMenu drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
      </Hidden>

      <Hidden mdDown>
        <StyledDivider orientation='vertical' flexItem light></StyledDivider>

        <NavigationMenu />
        <Grid container item xs justifyContent='flex-end'>
          <UserMenu />
        </Grid>
      </Hidden>
    </StyledAppBar>
  );
}
