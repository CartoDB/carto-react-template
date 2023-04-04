import { Grid, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';

const NavTabs = styled(Grid)(({ theme }) => ({
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
  '& .MuiTabs-root': {
    boxShadow: 'none',
  },
  '& .MuiTabs-vertical .MuiTab-root': {
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(2),
  },
}));

export default function NavigationMenu({ column: vertical }) {
  const location = useLocation();

  const pathname = location.pathname.split('/')[1] || false;

  const WrapperTabs = ({ vertical = false, children }) =>
    vertical ? (
      <VerticalNavTabs>{children}</VerticalNavTabs>
    ) : (
      <NavTabs>{children}</NavTabs>
    );

  return (
    <WrapperTabs vertical={vertical} container direction={vertical ? 'column' : 'row'}>
      <Tabs
        value={pathname}
        textColor={vertical ? 'primary' : 'inherit'}
        orientation={vertical ? 'vertical' : 'horizontal'}
      >
        <Tab label='Stores' value='stores' component={NavLink} to={ROUTE_PATHS.STORES} />
        <Tab
          label='Tileset'
          value='tileset'
          component={NavLink}
          to={ROUTE_PATHS.TILESET}
        />
      </Tabs>
    </WrapperTabs>
  );
}
