import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import rgbToHex from '../../utils/rgbToHex';
import { COLORS, LABELS } from 'components/layers/KpiLayer';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'block',
    marginBottom: theme.spacing(1),
  },

  element: {
    ...theme.typography.overline,
    textTransform: 'none',
    color: theme.palette.text.secondary,
    padding: theme.spacing(0.25, 0),
  },

  dot: {
    flex: '0 0 auto',
    width: 8,
    height: 8,
    marginRight: theme.spacing(1),
  },
}));

export default function KpiLegend() {
  const classes = useStyles();
  const { kpiLayer } = useSelector((state) => state.carto.layers);

  if (!kpiLayer) return null;

  return (
    <React.Fragment>
      <Typography className={classes.title} variant='caption'>
        Total revenue
      </Typography>

      {COLORS.map((elem, i) => (
        <Grid
          container
          direction='row'
          alignItems='center'
          className={classes.element}
          key={i}
        >
          <div
            className={classes.dot}
            style={{
              backgroundColor: rgbToHex(elem),
            }}
          ></div>
          {LABELS[i]}
        </Grid>
      ))}
    </React.Fragment>
  );
}
