import { useEffect } from 'react';
import collisionsSource from 'data/sources/collisionsSource';
import { COLLISIONS_LAYER_ID } from 'components/layers/CollisionsLayer';
import { useDispatch } from 'react-redux';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import { TimeSeriesWidget } from '@carto/react-widgets';
import { GroupDateTypes, AggregationTypes } from '@carto/react-core';

const useStyles = makeStyles(() => ({
  collisions: {},
  timeSeries: {
    position: 'fixed',
    left: '50%',
    background: 'white',
    width: 800,
    bottom: 32,
    transform: 'translateX(-50%)',
  },
}));

export default function Collisions() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(collisionsSource));

    dispatch(
      addLayer({
        id: COLLISIONS_LAYER_ID,
        source: collisionsSource.id,
      })
    );

    return () => {
      dispatch(removeLayer(COLLISIONS_LAYER_ID));
      dispatch(removeSource(collisionsSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.collisions}>
      <Box className={classes.timeSeries}>
        <TimeSeriesWidget
          id='timeSeries'
          title='Time series'
          dataSource={collisionsSource.id}
          column='date'
          operationColumn='vehcount'
          operation={AggregationTypes.SUM}
          duration={20000}
          stepSize={GroupDateTypes.WEEKS}
          formatter={(value) => `${value} cars involved`}
          stepSizeOptions={[GroupDateTypes.DAYS, GroupDateTypes.WEEKS]}
        />
      </Box>
    </Grid>
  );
}

