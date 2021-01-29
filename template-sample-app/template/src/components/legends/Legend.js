import { useState } from 'react';
import KpiLegend from './KpiLegend';
import StoresLegend from './StoresLegend';
import { Paper, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.caption,
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.common.white,

    '&:empty': {
      display: 'none',
    },
  },
  legendButton: {
    padding: theme.spacing(0.75),
  },
  legendIcon: {
    display: 'block',
  },
}));

function Legend({ className }) {
  const theme = useTheme();
  const classes = useStyles();
  const [collapsed, setCollapsed] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      {isMobile && collapsed && (
        <Paper
          elevation={4}
          className={`${classes.legendButton} ${className}`}
          onClick={() => setCollapsed(false)}
        >
          <ListAltOutlinedIcon className={classes.legendIcon} alt='Toggle legend' />
        </Paper>
      )}
      {((isMobile && !collapsed) || !isMobile) && (
        <Paper
          elevation={4}
          className={`${classes.root} ${className} `}
          onClick={() => setCollapsed(true)}
        >
          <KpiLegend />
          <StoresLegend />
        </Paper>
      )}
    </>
  );
}

export default Legend;
