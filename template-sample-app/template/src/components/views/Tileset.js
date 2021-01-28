import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBottomSheetOpen, setError } from 'config/appSlice';

import { Divider, Typography, makeStyles } from '@material-ui/core';

import {
  addLayer,
  addSource,
  removeLayer,
  removeSource,
  setViewState,
} from '@carto/react/redux';
import { AggregationTypes, FormulaWidget, HistogramWidget } from '@carto/react/widgets';

import { numberFormatter } from 'utils/formatter';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3, 3, 1.5),

    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(0),
    },
  },
}));

function Tileset() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setViewState({
        latitude: 0,
        longitude: 0,
        zoom: 1,
        transitionDuration: 500,
      })
    );

    dispatch(
      addSource({
        id: 'tilesetSource',
        type: 'bq',
        data: 'cartobq.maps.osm_buildings',
      })
    );

    dispatch(
      addLayer({
        id: 'tilesetLayer',
        source: 'tilesetSource',
      })
    );

    dispatch(setBottomSheetOpen(false));

    // Clean up when leave
    return () => {
      dispatch(removeLayer('tilesetLayer'));
      dispatch(removeSource('tilesetSource'));
    };
  }, [dispatch]);

  const onTotalFareAmountWidgetError = (error) => {
    dispatch(setError(`Error obtaining avg fare amount: ${error.message}`));
  };

  return (
    <div>
      <Typography variant='h5' gutterBottom className={classes.title}>
        OSM Buildings Analysis
      </Typography>

      <Divider />

      <FormulaWidget
        id='aggTotalFormulaSum'
        title='Total aggregated sum'
        dataSource='tilesetSource'
        column='aggregated_total'
        operation={AggregationTypes.SUM}
        formatter={numberFormatter}
        onError={onTotalFareAmountWidgetError}
        viewportFilter
      />

      <Divider />

      <HistogramWidget
        id='aggTotalHistogramCount'
        title='Total aggregated count'
        dataSource='tilesetSource'
        xAxisFormatter={numberFormatter}
        operation={AggregationTypes.COUNT}
        column='aggregated_total'
        ticks={[10, 100, 1e3, 1e4, 1e5, 1e6]}
        viewportFilter
      />

      <Divider />
    </div>
  );
}

export default Tileset;
