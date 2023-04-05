import { styled } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';
import LazyLoadRoute from 'components/common/LazyLoadRoute';
import DesktopContent from './DesktopContent';
import MobileContent from './MobileContent';

export const DRAWER_WIDTH = 350;

const NavDrawer = styled('nav')(({ theme }) => ({
  flex: '0 0 auto',

  [theme.breakpoints.down('md')]: {
    height: 95,
  },
  [theme.breakpoints.up('md')]: {
    position: 'relative',
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
}));

export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <NavDrawer>
      <LazyLoadRoute>
        {!isMobile && <DesktopContent />}
        {isMobile && <MobileContent />}
      </LazyLoadRoute>
    </NavDrawer>
  );
}
