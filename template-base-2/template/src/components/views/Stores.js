import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  stores: {},
}));

export default function Stores() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.stores}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
