import { LinearProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  topLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: theme.spacing(0.35),
    zIndex: 9999,
  },
}));

export default function TopLoading() {
  const classes = useStyles();

  return <LinearProgress className={classes.topLoading} color='secondary' />;
}
