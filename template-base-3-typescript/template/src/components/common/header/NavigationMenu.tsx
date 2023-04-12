import { Grid, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';

const NavTabs = styled(Grid)(({ theme }) => ({
  flexDirection: 'row',

  '& .MuiTab-root': {
    color: theme.palette.common.white,

    '&:hover': {
      borderBottomColor: theme.palette.common.white,
    },
  },
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.background.paper,
  },
}));

const VerticalNavTabs = styled(Grid)(({ theme }) => ({
  flexDirection: 'column',

  '& .MuiTabs-root': {
    boxShadow: 'none',
  },
  '& .MuiTabs-vertical .MuiTab-root': {
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(2),
  },
}));

export default function NavigationMenu({
  vertical = false,
}: {
  vertical?: boolean;
}) {
  const location = useLocation();

  const pathname = location.pathname.split('/')[1] || false;

  const WrapperTabs = ({
    vertical = false,
    children,
  }: {
    vertical?: boolean;
    children: React.ReactNode;
  }) =>
    vertical ? (
      <VerticalNavTabs container>{children}</VerticalNavTabs>
    ) : (
      <NavTabs container>{children}</NavTabs>
    );

  return (
    <WrapperTabs vertical={vertical}>
      <Tabs
        value={pathname}
        textColor={vertical ? 'primary' : 'inherit'}
        orientation={vertical ? 'vertical' : 'horizontal'}
      >
        <Tab
          label='Home'
          value=''
          component={NavLink as any}
          to={ROUTE_PATHS.DEFAULT}
        />
        {/* [hygen] Import links */}
      </Tabs>
    </WrapperTabs>
  );
}
