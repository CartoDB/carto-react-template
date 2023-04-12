import { Drawer, Grid, Toolbar } from '@mui/material';
import NavigationMenu from './NavigationMenu';

export default function DrawerMenu({ drawerOpen, handleDrawerToggle }) {
  return (
    <Drawer
      variant='temporary'
      anchor='left'
      open={drawerOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      PaperProps={{
        sx: { minWidth: 260 },
      }}
    >
      <Toolbar variant='dense' />
      <Grid container direction='column' justifyContent='space-between' item xs>
        <NavigationMenu column={true} />
      </Grid>
    </Drawer>
  );
}
