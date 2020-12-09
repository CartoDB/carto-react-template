import React, { useState } from 'react';
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

export function Legend(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      {isMobile && collapsed && (
        <Paper
          elevation={4}
          className={`${classes.legendButton} ${props.className}`}
          onClick={() => setCollapsed(false)}
        >
          <ListAltOutlinedIcon className={classes.legendIcon} alt='Toggle legend' />
        </Paper>
      )}
      {((isMobile && !collapsed) || !isMobile) && (
        <Paper
          elevation={4}
          className={`${classes.root} ${props.className} `}
          onClick={() => setCollapsed(true)}
        >
          <KpiLegend />
          <StoresLegend />
        </Paper>
      )}
    </>
  );
}
