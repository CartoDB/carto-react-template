import { useEffect, useState } from 'react';
import { Divider, Hidden, Grid } from '@mui/material';
import { AppBar } from '@carto/react-ui';
import DrawerMenu from './DrawerMenu';
import NavigationMenu from './NavigationMenu';
import Logo from './Logo';
import UserMenu from './UserMenu';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar
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
        <Divider orientation='vertical' light></Divider>
        <NavigationMenu />
        <Grid container item xs justifyContent='flex-end'>
          <UserMenu />
        </Grid>
      </Hidden>
    </AppBar>
  );
}
