import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Hidden, Toolbar, Drawer } from '@material-ui/core';
import { DRAWER_WIDTH } from './Main';

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
    position: 'absolute',
  },
}));

export default function Desktop() {
  const classes = useStyles();

  return (
    <Hidden xsDown>
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant='permanent'
        anchor='left'
        open
      >
        <Toolbar variant='dense' />
        <Grid container item xs>
          <Outlet />
        </Grid>
        <Outlet />
      </Drawer>
    </Hidden>
  );
}
