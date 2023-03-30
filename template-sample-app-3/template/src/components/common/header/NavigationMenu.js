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
      backgroundColor:
        theme.palette.appBar?.contrastText || theme.palette.primary?.contrastText,
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

export default function NavigationMenu({ column: vertical }) {
  const location = useLocation();
  const classes = useStylesNavigationMenu();

  const pathname = location.pathname.split('/')[1] || false;

  return (
    <Grid
      container
      direction={vertical ? 'column' : 'row'}
      className={!vertical ? classes.navTabs : classes.verticalNavTabs}
    >
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
    </Grid>
  );
}
