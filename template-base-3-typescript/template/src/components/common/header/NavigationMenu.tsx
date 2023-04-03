import { Grid, Tab, Tabs } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';

const useStylesNavigationMenu = makeStyles((theme) => ({
  navTabs: {
    '& .MuiTab-root': {
      color: theme.palette.common.white,

      '&:hover': {
        borderBottomColor: theme.palette.common.white,
      },
    },
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  verticalNavTabs: {
    '& .MuiTabs-root': {
      boxShadow: 'none',
    },

    '& .MuiTab-root': {
      justifyContent: 'flex-start',
      paddingLeft: theme.spacing(2),
    },
  },
}));

export default function NavigationMenu({
  column = false,
}: {
  column?: boolean;
}) {
  const location = useLocation();
  const classes = useStylesNavigationMenu();

  const pathname = location.pathname.split('/')[1] || false;

  return (
    <Grid
      container
      direction={column ? 'column' : 'row'}
      className={!column ? classes.navTabs : classes.verticalNavTabs}
    >
      <Tabs
        value={pathname}
        textColor={column ? 'primary' : 'inherit'}
        orientation={column ? 'vertical' : 'horizontal'}
      >
        <Tab
          label='Home'
          value=''
          component={NavLink as any}
          to={ROUTE_PATHS.DEFAULT}
        />
        {/* [hygen] Import links */}
      </Tabs>
    </Grid>
  );
}
