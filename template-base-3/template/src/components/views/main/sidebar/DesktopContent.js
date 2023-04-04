import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Grid, Drawer } from '@mui/material';
import { DRAWER_WIDTH } from './Sidebar';

const DrawerDesktop = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: DRAWER_WIDTH,
    position: 'absolute',
  },
}));

export default function DesktopContent() {
  return (
    <DrawerDesktop variant='permanent' anchor='left' open>
      <Grid container item xs>
        <Outlet />
      </Grid>
    </DrawerDesktop>
  );
}
