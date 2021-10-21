import { useEffect } from 'react';
import collisionsSource from 'data/sources/collisionsSource';
import { COLLISIONS_LAYER_ID } from 'components/layers/CollisionsLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
  setViewState,
} from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography } from '@material-ui/core';
import { TimeSeriesWidget } from '@carto/react-widgets';
import { GroupDateTypes, AggregationTypes } from '@carto/react-core';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3, 3, 1.5),
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

  useEffect(() => {
    dispatch(setViewState({ longitude: -122.335167, latitude: 47.608013, zoom: 11 }));
  });

  // [hygen] Add useEffect

  return (
    <Grid item xs>
      <Typography variant='h5' gutterBottom className={classes.title}>
        Collisions
      </Typography>

      <Divider />

      <TimeSeriesWidget
        id='collisionsByDate'
        title='Cars involved in collisions'
        dataSource={collisionsSource.id}
        column='date'
        operationColumn='vehcount'
        operation={AggregationTypes.SUM}
        duration={20000}
        stepSize={GroupDateTypes.WEEKS}
        formatter={(value) => `${value} cars involved`}
        stepSizeOptions={[GroupDateTypes.DAYS, GroupDateTypes.WEEKS]}
      />
    </Grid>
  );
}
